#!/usr/bin/env bash

set -e

post_id=$1
post_file="./src/posts/${post_id}.vue"

if [ -z "$post_id" ]; then
    echo "Usage: $0 <post-id>"
    exit 1
fi

if [ -f "$post_file" ]; then
    echo "File '$post_file' already exists."
    exit 1
fi

cat > "$post_file" <<EOF
<template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
EOF
