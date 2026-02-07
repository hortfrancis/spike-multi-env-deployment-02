import { execSync } from 'node:child_process';

const run = (command: string): string => {
	return execSync(command, { encoding: 'utf-8' }).trim();
};

export const findReleaseBranch = (): string => {
	const raw = run('git branch --list "release/*"');
	console.log('Raw branches output:', raw);

  const branches = raw
		.split('\n')
		.map((line) => line.replace(/^\*\s+/, '').trim())
		.filter(Boolean);

	if (branches.length !== 1) {
		throw new Error(
			`Expected exactly one release/* branch, found ${branches.length}.`
		);
	}

	return branches[0];
};

export const extractVersion = (branch: string): string => {
	const version = branch.replace('release/', '');
	if (version.startsWith('v')) {
		throw new Error('Version cannot start with "v"');
	}
	if (version === '') {
		throw new Error('Version cannot be empty');
	}
	if (!version.match(/^\d+\.\d+\.\d+$/)) {
		throw new Error('Version must be in the format x.y.z');
	}
	return version;
};
