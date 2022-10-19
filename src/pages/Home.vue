<script setup lang="ts">
import UIPage from '@components/ui/UIPage.vue';

import SectionSkills from '@components/sections/SectionSkills.vue';
import SectionExperience from '@components/sections/SectionExperience.vue';
import SectionEducation from '@components/sections/SectionEducation.vue';
</script>

<template>
  <UIPage bg>
    <SectionSkills />
    <SectionExperience />
    <SectionEducation />
  </UIPage>
</template>
