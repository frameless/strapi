import { Strapi } from '@strapi/strapi';
import plugin from './bootstrap'; // Import your plugin file

const mockStrapi: any = {
  db: {
    lifecycles: {
      subscribe: jest.fn(),
    },
    query: jest.fn(),
  },
  config: {
    get: jest.fn(),
  },
};

describe('strapi-plugin-old-slugs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return early if strapi.db is not defined', async () => {
    const invalidStrapi = { ...mockStrapi, db: undefined };
    await plugin({ strapi: invalidStrapi as Strapi });
    expect(mockStrapi.db?.lifecycles.subscribe).not.toHaveBeenCalled();
  });

  it('should subscribe to lifecycles if strapi.db is defined', async () => {
    await plugin({ strapi: mockStrapi as Strapi });
    expect(mockStrapi.db?.lifecycles.subscribe).toHaveBeenCalled();
  });
  it('should subscribe to lifecycles only once', async () => {
    await plugin({ strapi: mockStrapi as Strapi });
    expect(mockStrapi.db?.lifecycles.subscribe).toHaveBeenCalledTimes(1);
  });
  describe('Lifecycle event handling', () => {
    let lifecycleCallback: Function;

    beforeEach(async () => {
      await plugin({ strapi: mockStrapi as Strapi });
      lifecycleCallback = (mockStrapi.db?.lifecycles.subscribe as jest.Mock).mock.calls[0][0];
    });

    it('should return early if event model UID is not in config', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = { model: { uid: 'not.in.config' }, action: 'beforeUpdate' };
      await lifecycleCallback(event);
      expect(mockStrapi.db?.query).not.toHaveBeenCalled();
    });
    it('should return early if event action is not "beforeUpdate"', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = { model: { uid: 'test.model' }, action: 'beforeCreate' };
      await lifecycleCallback(event);
      expect(mockStrapi.db?.query).not.toHaveBeenCalled();
    });
    it('should query the database only for "beforeUpdate" events', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = {
        model: { uid: 'test.model' },
        action: 'beforeUpdate',
        params: { data: {} } as any,
      };
      (mockStrapi.db?.query as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue({}),
      });
      await lifecycleCallback(event);
      expect(mockStrapi.db?.query).toHaveBeenCalled();
    });
    it('should query the database only for provided uid through config', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = { model: { uid: 'test.model' }, action: 'beforeUpdate', params: { data: {} } as any };
      (mockStrapi.db?.query as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue({}),
      });
      await lifecycleCallback(event);
      expect(mockStrapi.db?.query).toHaveBeenCalledWith('test.model');
    });
    it('should update oldSlugs when slug changes', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = {
        model: { uid: 'test.model' },
        action: 'beforeUpdate',
        params: { data: { uuid: '123', slug: 'new-slug' } } as any,
      };
      const existingEntry = { uuid: '123', slug: 'old-slug', oldSlugs: [] };
      (mockStrapi.db?.query as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue(existingEntry),
      });

      await lifecycleCallback(event);

      expect(event.params.data.oldSlugs).toEqual(['old-slug']);
    });

    it('should not duplicate oldSlugs', async () => {
      mockStrapi.config.get.mockReturnValue({ contentTypes: [{ uid: 'test.model' }] });
      const event = {
        model: { uid: 'test.model' },
        action: 'beforeUpdate',
        params: { data: { uuid: '123', slug: 'same-slug' } as any },
      };
      const existingEntry = { uuid: '123', slug: 'same-slug', oldSlugs: ['old-slug'] };
      (mockStrapi.db?.query as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue(existingEntry),
      });
      const product = await mockStrapi.db?.query('test.model').findOne({ where: { uuid: '123' } });
      await lifecycleCallback(event);
      expect(product?.oldSlugs).toEqual(['old-slug']);
      expect(event.params.data.oldSlugs).toBeUndefined();
    });
  });
});
