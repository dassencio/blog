<template>
  <p>
    iPhones (and iPads) do not offer the possibility to automatically group
    photos and videos by date into separate directories. If you prefer
    organizing your photos and videos in this manner, you can transfer them to
    your computer and then run the script below in the directory to which they
    were transferred. This script will automatically determine the dates when
    your photos and videos were created and place them into directories named in
    the format <code>YYYY-MM-DD</code>. For example, all photos and videos
    created on January 15, 2016, will be placed in the directory
    <code>2016-01-15</code>.
  </p>

  <p>
    Before you can run the script, you need to install the
    <a href="http://manpages.ubuntu.com/manpages/precise/man1/mediainfo.1.html"
      ><code>mediainfo</code></a
    >
    and
    <a href="http://exiv2.org/manpage.html"><code>exiv2</code></a>
    packages. If you're using Ubuntu/Debian, you can do this by opening a
    terminal and running the following command:
  </p>

  <CodeBlock code="sudo apt-get install exiv2 mediainfo" />

  <p>
    The script below can be downloaded by clicking
    <a :href="bashFile" download="group-photos-and-videos.sh">here</a>.
  </p>

  <CodeBlock language="bash" :code="bashCode" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const bashCode = `
#!/usr/bin/env bash

# This script will work even if the filenames contain spaces.
IFS=$'\\n'

# Process the photos first.
for file in $(ls *.JPG 2>/dev/null)
do
  # Determine the date the photo was taken.
  date=$(exiv2 "$file" 2>/dev/null | \\
         grep timestamp | \\
         cut -d ' ' -f 4 | \\
         sed 's/:/-/g')

  if [ ! -z "$date" ]
  then
    mkdir -p $date
    mv "$file" $date
  else
    echo "Ignoring photo '$file' (no valid date found)"
  fi
done

# Now process the videos.
for file in $(ls *.MOV 2>/dev/null)
do
  # Determine the date the video was recorded.
  date=$(mediainfo --fullscan "$file" 2>/dev/null | \\
         grep com.apple.quicktime.creationdate | \\
         grep -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}')

  if [ ! -z "$date" ]
  then
    mkdir -p $date
    mv "$file" $date
  else
    echo "Ignoring video '$file' (no valid date found)"
  fi
done
`;

const bashFile = URL.createObjectURL(
  new Blob([bashCode.trim()], { type: "text/plain" })
);
</script>
