import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from "@commitlint/types";

const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    helpUrl:
        'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
module.exports = config