<template>
  <div class="h-screen m20">
    <pullList  :on-scroll-to-lower="onScrollToLower">
      <template #list>
        <userForm />
      </template>
    </pullList>
  </div>
</template>

<script setup lang="ts">
  import userForm from '@/components/FormCell/userForm.vue'

  const onScrollToLower = () => {
    console.log('scroll to lower')
  }
</script>

<style scoped></style>
