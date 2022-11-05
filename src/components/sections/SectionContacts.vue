<script setup lang="ts">
import { computed } from 'vue';

import { useData } from '@hooks/data';

import UISection from '@components/ui/UISection.vue';
import ListContacts from '@components/list/ListContacts.vue';

const { items: data } = useData<ContactData, ContactsLocalize>('contacts');

const items = computed(() => data.value.filter((item) => item.id !== 'socials'));
</script>

<template>
  <UISection
    id="contacts"
  >
    <div class="contacts">
      <ListContacts :items="items" />
    </div>
  </UISection>
</template>
