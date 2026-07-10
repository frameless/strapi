# Monorepo Deployment Guide

## Overview

This repository follows a monorepo structure containing multiple applications.

A single production Dockerfile (`Dockerfile.prod`) is used to build and package all applications. The CI/CD pipeline builds Docker images and pushes them to GitHub Container Registry (ghcr.io), after which Harbor manages validation and deployment.

## CI/CD Pipeline

On every push to `main` and on every tag push, the pipeline runs through these steps:

1. **Build the application** — install dependencies and build the monorepo.
2. **Build the Docker image** — package the applications using `Dockerfile.prod`.
3. **Log in to the Docker registry** — authenticate with GitHub Container Registry (ghcr.io).
4. **Push the new image** — publish the image, tagged based on the Git ref (branch, PR, or version tag).

The pipeline authenticates using a repository-level secret, so no per-developer token setup is required to run a release. If you need to pull or log in to `ghcr.io` locally (e.g. to inspect a built image), see GitHub's docs on [authenticating to the Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

## Release Process

Follow these steps to release a new version:

1. Push your changes to the `main` branch.
2. Update your local `main` branch:

   ```bash
   git checkout main
   git pull origin main
   ```

3. Check the current version by looking at the latest Git tag:

   ```bash
   git describe --tags --abbrev=0
   ```

4. Create a new Git tag:

   ```bash
   git tag -a vX.Y.Z -m "Release version X.Y.Z" <git-hash>
   ```

5. Push the tag:

   ```bash
   git push origin vX.Y.Z
   ```

This will trigger the CI/CD pipeline to build and publish the new Docker image.

## Deployment Flow

1. **CI/CD Pipeline**
   - Builds and pushes the Docker image to the registry.

2. **Harbor**
   - Detects the new image tag.
   - Pulls and tests the image.
   - Releases the image if validation succeeds.

3. **Tenant Repository**
   - Patch versions (`vX.Y.Z` where only Z changes):
     - Automatically deployed to the test environment.

   - Minor/Major versions:
     - Require manual approval from the Infra team before deployment.

4. **Further Environments**
   - Promotion to acceptance/production is handled according to `forejo-infra-docs`.

## Deployment Timing

- GitHub CI/CD: **10–15 minutes**
- Harbor validation: **~10 minutes**

**Total expected time:** ~25–30 minutes before the version appears in the tenant repository.

## FAQ

### 1. What should I do if the new version does not appear in the tenant repository?

Possible causes:

- The version is **minor or major** and requires Infra team approval.
- The Docker image failed validation in Harbor.

**Actions:**

- Test the Docker image locally.
- Verify that all apps build and run correctly.
- If everything works locally, contact the Infra team to check Harbor logs.

### 2. What should I do if the new Docker image appears, but changes are not reflected in the app?

Possible causes:

- Runtime errors when the application starts.
- Missing environment variables.
- Incorrect Helm chart configuration.

**Actions:**

- Check application logs.
- Verify environment variables in the tenant repository.
- Review Helm chart values.
- Contact Infra team if the issue persists.

---

### 3. How long does deployment take?

- CI/CD: 10–15 minutes
- Harbor processing: ~10 minutes

**Total:** 25–30 minutes

### 4. What should I do if the CI/CD pipeline fails?

- Check GitHub Actions logs for errors.
- Common issues:
  - Build failures
  - Dockerfile misconfiguration
  - Dependency issues

Fix the issue and push changes again.

### 5. How can I test my Docker image locally?

Build and run the image locally before tagging:

See the [README.md section "Start the Server using Docker"](README.md#start-the-server-using-docker) for the Docker build and run instructions.

Ensure all applications behave as expected.

### 6. What versioning strategy should I follow?

Use **Semantic Versioning (SemVer):**

- **Patch (Z):** Bug fixes → auto-deployed
- **Minor (Y):** New features → requires approval
- **Major (X):** Breaking changes → requires approval

### 7. What if Harbor rejects the Docker image?

- Check:
  - Application startup logs
  - Health checks
  - Missing dependencies

If unresolved, contact the Infra team with logs and tag details.

### 8. Can I deploy only one app from the monorepo?

Currently, all apps are built using a single production Dockerfile (`Dockerfile.prod`). Any change triggers a rebuild of the full image.

### 9. What if I tagged the wrong version?

- Delete the tag locally and remotely:

  ```bash
  git tag -d vX.Y.Z
  git push origin :refs/tags/vX.Y.Z
  ```

- Create and push the correct tag.

### 10. Who should I contact for deployment issues?

- **Application issues:** Your development team
- **CI/CD pipeline issues (this repo's GitHub Actions):** Your development team
- **Harbor / tenant repository issues:** Infra team
- **Environment/config issues:** Infra or DevOps team

## Notes

- Always test locally before tagging a release.
- Ensure environment variables are properly configured.
- Monitor logs after deployment for unexpected issues.
- Link to the [tenant repository](https://git.commonground.utrecht.nl/gemeente-utrecht/team-frameless) for deployment status and logs.
