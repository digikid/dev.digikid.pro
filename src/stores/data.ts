import { defineStore } from 'pinia';

import config from '@src/config';

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
    stack,
    tools,
    contacts,
    projects: projects.map((item) => ({
      ...item,
      version: '1.0.0',
    })),
  }),
  actions: {
    async loadVersions() {
      try {
        this.projects = await Promise.all(this.projects.map(async (item) => {
          const { id, repo } = item;

          if (repo && repo.includes('github') && config.prod) {
            const response = await fetch(`https://raw.githubusercontent.com/digikid/${id}/main/package.json`);

            if (response.ok) {
              const { version } = await response.json();

              if (version) {
                return ({
                  ...item,
                  version,
                });
              }
            }
          }

          return item;
        }));
      } catch (e) {
        if (config.dev && e instanceof Error) {
          console.log(e.message);
        }
      }
    },
  },
});
