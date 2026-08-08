#!/usr/bin/env bash

set -e

posts_file="./src/posts.ts"

if [ ! -f "$posts_file" ]; then
    echo "Could not find '$posts_file'."
    exit 1
fi

last_post_id=$(
    grep -m1 'id: "' "$posts_file" |
    sed -E 's/.*id: "([0-9]+)".*/\1/'
)

new_post_id=$((last_post_id + 1))
new_post_file="./src/posts/${new_post_id}.vue"

cat > "$new_post_file" <<EOF
<template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
EOF
