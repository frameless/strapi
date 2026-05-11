'use server';

import { type NextRequest, NextResponse } from 'next/server';

// Fixed UUIDs (consistent across requests)

const FORM_UUID = 'e450890a-4166-410e-8d64-0a54ad30ba01';
const FORM_STEP_UUID = '9e6eb3c5-e5a4-4abf-b64a-73d3243f2bf5';
const SUB_STEP_ID = '58aad9c3-29c7-4568-9047-3ac7ceb0f0ff';

// In-memory submission store (dev only, resets on server restart)

interface StoredSubmission {
  stepData: Record<string, unknown>;
  completed: boolean;
}
const store = new Map<string, StoredSubmission>();

// Demo form fields

const COMPONENTS = [
  { id: 'f1', type: 'textfield', key: 'firstName', label: 'Voornaam', validate: { required: true } },
  { id: 'f2', type: 'textfield', key: 'lastName', label: 'Achternaam', validate: { required: true } },
  { id: 'f3', type: 'email', key: 'email', label: 'E-mailadres', validate: { required: false } },
];

const DEMO_FORM = {
  uuid: FORM_UUID,
  name: 'Demo formulier',
  slug: 'demo-form',
  url: '/api/open-forms-mock/forms/demo-form',
  loginRequired: false,
  loginOptions: [],
  showProgressIndicator: true,
  showSummaryProgress: false,
  maintenanceMode: false,
  active: true,
  submissionAllowed: 'yes',
  submissionLimitReached: false,
  suspensionAllowed: false,
  sendConfirmationEmail: false,
  displayMainWebsiteLink: false,
  submissionStatementsConfiguration: [],
  appointmentOptions: { isAppointment: false, supportsMultipleProducts: null },
  literals: {
    beginText: { resolved: 'Begin', value: '' },
    changeText: { resolved: 'Wijzig', value: '' },
    confirmText: { resolved: 'Bevestig', value: '' },
    previousText: { resolved: 'Vorige', value: '' },
  },
  steps: [
    {
      uuid: FORM_STEP_UUID,
      slug: 'step-1',
      formDefinition: 'Stap 1',
      index: 0,
      literals: {
        previousText: { resolved: 'Vorige', value: '' },
        saveText: { resolved: 'Opslaan', value: '' },
        nextText: { resolved: 'Volgende', value: '' },
      },
      url: `/api/open-forms-mock/forms/demo-form/steps/${FORM_STEP_UUID}`,
    },
  ],
  introductionPageContent: '',
  explanationTemplate: '',
  requiredFieldsWithAsterisk: true,
  resumeLinkLifetime: 7,
  autoLoginAuthenticationBackend: '',
  translationEnabled: false,
  hideNonApplicableSteps: false,
  cosignLoginOptions: [],
  cosignHasLinkInEmail: false,
  paymentRequired: false,
  submissionReportDownloadLinkTitle: '',
  newRendererEnabled: false,
  communicationPreferencesPortalUrl: '',
};

// Helpers

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { 'Content-Language': 'nl' },
  });
}

function buildSubmission(uuid: string, state?: StoredSubmission) {
  return {
    id: uuid,
    url: `/api/open-forms-mock/submissions/${uuid}`,
    form: '/api/open-forms-mock/forms/demo-form',
    formUrl: `http://localhost:3000/nl/formulier/demo-form`,
    initialDataReference: '',
    steps: [
      {
        id: SUB_STEP_ID,
        name: 'Stap 1',
        url: `/api/open-forms-mock/submissions/${uuid}/steps/${FORM_STEP_UUID}`,
        formStep: `/api/open-forms-mock/forms/demo-form/steps/${FORM_STEP_UUID}`,
        isApplicable: true,
        completed: state?.completed ?? false,
        canSubmit: true,
      },
    ],
    submissionAllowed: 'yes',
    isAuthenticated: false,
    payment: { isRequired: false, amount: null, hasPaid: false },
  };
}

function buildStep(uuid: string, state?: StoredSubmission) {
  return {
    id: SUB_STEP_ID,
    slug: 'step-1',
    formStep: {
      index: 0,
      configuration: { components: COMPONENTS },
    },
    data: state?.stepData ?? null,
    isApplicable: true,
    completed: state?.completed ?? false,
    canSubmit: true,
  };
}

// Route handlers

type Params = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { path } = await params;
  const [p0, p1, p2, p3] = path;

  // GET /forms/{slug}
  if (p0 === 'forms' && path.length === 2) {
    return ok(DEMO_FORM);
  }

  // GET /i18n/info
  if (p0 === 'i18n' && p1 === 'info') {
    return ok({
      languages: [
        { code: 'nl', name: 'Nederlands' },
        { code: 'en', name: 'English' },
      ],
      current: 'nl',
    });
  }

  // GET /i18n/formio/{lang} or /i18n/compiled-messages/{lang}.json
  if (p0 === 'i18n') return ok({});

  // GET /analytics/analytics-tools-config-info
  if (p0 === 'analytics') {
    return ok({ govmetricSourceId: '', govmetricSecureGuid: '', enableGovmetricAnalytics: false });
  }

  // GET /submissions/{uuid}
  if (p0 === 'submissions' && path.length === 2) {
    const state = store.get(p1);
    if (!state) return ok({ detail: 'Not found.' }, 404);
    return ok(buildSubmission(p1, state));
  }

  // GET /submissions/{uuid}/steps/{stepUuid}
  if (p0 === 'submissions' && p2 === 'steps' && path.length === 4) {
    const state = store.get(p1);
    if (!state) return ok({ detail: 'Not found.' }, 404);
    return ok(buildStep(p1, state));
  }

  // GET /submissions/{uuid}/summary
  if (p0 === 'submissions' && p2 === 'summary') {
    const state = store.get(p1);
    if (!state) return ok({ detail: 'Not found.' }, 404);
    const data = (state?.stepData ?? {}) as Record<string, unknown>;
    return ok([
      {
        slug: 'step-1',
        name: 'Stap 1',
        data: COMPONENTS.map((c) => ({
          name: c.label,
          value: data[c.key] ?? '',
          component: c,
        })),
      },
    ]);
  }

  // GET /submissions/{uuid}/status  (polled after _complete)
  if (p0 === 'submissions' && p2 === 'status') {
    return ok({
      status: 'done',
      result: 'success',
      publicReference: 'MOCK-001',
      confirmationPageTitle: 'Bedankt',
      confirmationPageContent: '<p>Uw formulier is ontvangen. Referentie: <strong>MOCK-001</strong>.</p>',
      reportDownloadUrl: '',
      paymentUrl: '',
      mainWebsiteUrl: '',
    });
  }

  return ok({ detail: 'Not found.' }, 404);
}

export async function POST(req: NextRequest, { params }: Params) {
  const { path } = await params;
  const [p0, p1, p2, p3, p4] = path;
  const body = await req.json().catch(() => ({}));

  // POST /submissions
  if (p0 === 'submissions' && path.length === 1) {
    const uuid = crypto.randomUUID();
    store.set(uuid, { stepData: {}, completed: false });
    return ok(buildSubmission(uuid), 201);
  }

  // POST /submissions/{uuid}/_complete
  if (p0 === 'submissions' && p2 === '_complete') {
    return ok({ statusUrl: `/api/open-forms-mock/submissions/${p1}/status` });
  }

  // POST /submissions/{uuid}/steps/{stepUuid}/validate
  if (p0 === 'submissions' && p2 === 'steps' && p4 === 'validate') {
    return ok({});
  }

  // POST /submissions/{uuid}/steps/{stepUuid}/_check-logic
  if (p0 === 'submissions' && p2 === 'steps' && p4 === '_check-logic') {
    const state = store.get(p1);
    const merged = { ...(state?.stepData ?? {}), ...(body.data ?? {}) };
    return ok({
      submission: buildSubmission(p1, state),
      step: {
        ...buildStep(p1, state),
        data: merged,
      },
    });
  }

  return ok({ detail: 'Not found.' }, 404);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { path } = await params;
  const [p0, p1, p2] = path;
  const body = await req.json().catch(() => ({}));

  // PUT /submissions/{uuid}/steps/{stepUuid}
  if (p0 === 'submissions' && p2 === 'steps' && path.length === 4) {
    const existing = store.get(p1) ?? { stepData: {}, completed: false };
    const updated = { ...existing, stepData: body.data ?? {}, completed: true };
    store.set(p1, updated);
    return ok(buildStep(p1, updated));
  }

  return ok({ detail: 'Not found.' }, 404);
}

export async function PATCH(req: NextRequest, ctx: Params) {
  return PUT(req, ctx);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { path } = await params;
  const [p0, p1, p2] = path;

  // DELETE /submissions/{uuid}
  if (p0 === 'submissions' && path.length === 2) {
    store.delete(p1);
    return new NextResponse(null, { status: 204 });
  }

  // DELETE /authentication/{submissionId}/session  (triggered by "Annuleren" button)
  if (p0 === 'authentication' && p2 === 'session') {
    store.delete(p1);
    return new NextResponse(null, { status: 204 });
  }

  return ok({ detail: 'Not found.' }, 404);
}
