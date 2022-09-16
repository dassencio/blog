<template>
  <header class="header">
    <div class="header__content">
      <NavBarLogo />
      <NavBarIcon
        :image="linkedInLogo"
        name="LinkedIn"
        url="https://www.linkedin.com/in/dassencio"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import NavBarIcon from "@/components/NavBarIcon.vue";
import linkedInLogo from "@/assets/images/linkedin.svg";
import NavBarLogo from "./NavBarLogo.vue";
</script>

<style scoped lang="scss">
$base-length: $view-paragraph-font-size;

.header {
  background-color: $nav-bar-background-color;
  border-bottom: rem(1px) solid $nav-bar-separator-color;
  &__content {
    align-items: center;
    display: flex;
    height: 5 * $base-length;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 $base-length;
    width: $desktop-width-mode;
  }
}
</style>
