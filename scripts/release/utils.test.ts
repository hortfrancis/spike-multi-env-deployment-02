import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { findReleaseBranch } from './utils';

// cwd = current working directory 
let cwd = '';
let originalCwd = '';

/** Run a shell command in the temp repo */
const run = (command: string) => {
  return execSync(command, { cwd, encoding: 'utf-8' }).trim();
};

beforeEach(() => {
  originalCwd = process.cwd();
  cwd = mkdtempSync(join(tmpdir(), 'test-repo-'));

  run('git init');
  run('git branch -M main'); // Set default branch to `main` (not `master`)
  run('git config user.email "test@test.com"');
  run('git config user.name "Test"');
  run('git commit --allow-empty -m "initial commit"');

  process.chdir(cwd);
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(cwd, { recursive: true });
});

describe('release utils', () => {
  describe('findReleaseBranch', () => {
    it('returns branch name when exactly one release/* branch exists', () => {
      run('git branch release/v1.0.0');

      const result = findReleaseBranch();
      expect(result).toBe('release/v1.0.0');
    });

    it('throws when no release/* branch exists', () => {
      // No release branch created
      expect(() => findReleaseBranch()).toThrow();
    });

    it('throws when multiple release/* branches exist', () => {
      run('git branch release/1.5.0');
      run('git branch release/1.6.0');

      expect(() => findReleaseBranch()).toThrow();
    });

    it('ignores non-release branches', () => {
      run('git branch feature/something');
      run('git branch release/1.5.0');

      const result = findReleaseBranch();
      expect(result).toBe('release/1.5.0');
    });
  });

  

});