<template>
  <p>
    If you want to extend the size of a disk partition via the command line,
    consider using
    <a href="http://linux.die.net/man/8/fdisk"><code>fdisk</code></a
    >. It's important to note that <code>fdisk</code> is only capable of
    manipulating the
    <a href="https://en.wikipedia.org/wiki/Disk_partitioning"
      >partition table</a
    >
    of a disk. To extend the
    <a href="https://en.wikipedia.org/wiki/File_system">file system</a> within a
    partition (i.e., the map of the files and directories in it), you will need
    a different tool. For ext2, ext3, and ext4 file systems, you can use
    <a href="http://linux.die.net/man/8/resize2fs"><code>resize2fs</code></a>
    for that purpose, as I will explain later in this post. I assume that you're
    using Ubuntu/Debian; if not, you might have to adapt some of the commands
    below to have them work in your distribution.
  </p>

  <p>
    For illustration purposes, I will use a disk with 1000 MB of space, and its
    <a href="https://en.wikipedia.org/wiki/Device_file">device node</a> is
    <code>/dev/sda</code>. To change the partition table of your disk, you will
    need to replace all occurrences of <code>/dev/sda</code> in the commands
    below with the actual device node of your disk. Please back up your data
    before doing anything shown here!
  </p>

  <p>
    To begin, open the partition table of your disk with <code>fdisk</code>:
  </p>

  <CodeBlock code="sudo fdisk /dev/sda" />

  <p>Now, list all the partitions:</p>

  <CodeBlock code="Command (m for help): **p**" />

  <p>In my case, this is what I see:</p>

  <CodeBlock
    code="
    Disk /dev/sda: 1000 MB, 1000000000 bytes
    255 heads, 63 sectors/track, 121 cylinders, total 1953125 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0xbfd8408f

       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1            2048      400000      198976+  83  Linux
    /dev/sda2         1500000     1953124      226562+  83  Linux
    "
  />

  <p>
    There are two partitions on this disk. The <code>Start</code> and
    <code>End</code> columns show the
    <a href="https://en.wikipedia.org/wiki/Disk_sector">disk sectors</a> where
    these partitions start and end, respectively. For instance, the first
    partition starts at sector 2048 and ends at sector 400000. Since each sector
    is 512 bytes long (see the third line), this means the first partition has
    512 * (400000 - 2048) = 203751424 bytes (approximately 200 MB). All sectors
    numbered in the range 400001 to 1499999 are unused since the second
    partition starts at sector 1500000. To extend the first partition up to the
    1499999th sector, we must first delete this partition:
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-4): **1**
    "
  />

  <p>
    Listing all the partitions again (with the <code>p</code> command) now shows
    only the second one:
  </p>

  <CodeBlock
    code="
    Disk /dev/sda: 1000 MB, 1000000000 bytes
    255 heads, 63 sectors/track, 121 cylinders, total 1953125 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x283b0c39

       Device Boot      Start         End      Blocks   Id  System
    /dev/sda2         1500000     1953124      226562+  83  Linux
    "
  />

  <p>
    Now, we can recreate the first partition with a larger size. If there is
    data on that partition, be careful during this step. You must recreate the
    partition starting at the same sector as it was before (2048 in my case), or
    you might permanently lose the stored data:
  </p>

  <CodeBlock
    code="
    Command (m for help): **n**
    Partition type:
    p   primary (1 primary, 0 extended, 3 free)
    e   extended
    Select (default p): **p**
    Partition number (1-4, default 1): **1**
    First sector (2048-1953124, default 2048): **2048**
    Last sector, +sectors or +size{K,M,G} (2048-1499999, default 1499999): **1499999**
    "
  />

  <p>
    If you list the partitions again, you will see that the first one now
    occupies all sectors in the range 2048 to 1499999:
  </p>

  <CodeBlock
    code="
    Disk /dev/sda: 1000 MB, 1000000000 bytes
    255 heads, 63 sectors/track, 121 cylinders, total 1953125 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0xbfd8408f

       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1            2048     1499999      748976   83  Linux
    /dev/sda2         1500000     1953124      226562+  83  Linux
    "
  />

  <p>Now, write the changes to the disk's partition table:</p>

  <CodeBlock
    code="
    Command (m for help): **w**
    The partition table has been altered!

    Syncing disks.
    "
  />

  <p>
    If you have an ext2, ext3, or ext4 file system in <code>/dev/sda1</code>,
    you can extend it with <code>resize2fs</code> to make it occupy the full
    partition size. Before doing this, reboot your device to allow the kernel to
    recognize the changes to the disk's partition table. Then, run:
  </p>

  <CodeBlock code="sudo resize2fs /dev/sda1" />

  <p>
    The file system should now occupy the entire size of <code>/dev/sda1</code>.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
