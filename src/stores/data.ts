import { defineStore } from 'pinia';

import skills from '@data/skills.json';
import education from '@data/education.json';
import experience from '@data/experience.json';
import projects from '@data/projects.json';
import stack from '@data/stack.json';
import tools from '@data/tools.json';
import contacts from '@data/contacts.json';

export const useDataStore = defineStore('data', {
  state: () => ({
    skills,
    education,
    experience,
    projects,
    stack,
    tools,
    contacts,
  }),
});
