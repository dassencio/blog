<template>
  <p>
    If you want to extend the size of one of your disk partitions via command
    line, you should use
    <a href="http://linux.die.net/man/8/fdisk">fdisk</a>. Please notice that
    fdisk can only manipulate the
    <a href="https://en.wikipedia.org/wiki/Disk_partitioning"
      >partition table</a
    >
    of a disk. To actually extend the
    <a href="https://en.wikipedia.org/wiki/File_system">file system</a> of a
    partition, you will need a different tool (for ext2, ext3 and ext4, you can
    use <a href="http://linux.die.net/man/8/resize2fs">resize2fs</a>; I will
    show how at the end of this post). Roughly speaking, the partition table
    contains a map of the partitions of your disk while each partition can
    contain a file system which stores a map of the files and directories in
    that partition.
  </p>

  <p>
    I have made the assumption that you're using Ubuntu/Debian; if not, you
    might have to adapt some of the commands below to have them work in your
    distribution.
  </p>

  <p>
    For illustration purposes, I will use a disk with 1000MB of space whose
    <a href="https://en.wikipedia.org/wiki/Device_file">device node</a> is
    <code>/dev/sda</code>. To change the partition table of your disk, you will
    need to replace all occurrences of <code>/dev/sda</code> in the commands
    below with the actual device node of your disk. Please
    <b>backup your data</b> before doing anything shown here!
  </p>

  <p>To start, open the partition table of your disk with fdisk:</p>

  <CodeBlock code="sudo fdisk /dev/sda" />

  <p>Now list all partitions:</p>

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
    There are two partitions in this disk. The <code>Start</code> and
    <code>End</code> columns show the
    <a href="https://en.wikipedia.org/wiki/Disk_sector">disk sectors</a> where
    these partitions start and end respectively. For instance, the first
    partition starts at sector 2048 and ends at sector 400000. Since each sector
    is 512-bytes long (see the third line), this means the first partition has
    512 × (400000 - 2048) = 203751424 bytes (approximately 200MB). All sectors
    numbered in the range 400001-1499999 are unused since the second partition
    starts at sector 1500000, so we can extend the first partition up to the
    1499999-th sector. To do that, we must first delete this partition:
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-4): **1**
    "
  />

  <p>
    Listing all partitions again (<code>p</code>) shows now only the second one:
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
    Now we can recreate the first partition with a bigger size. If there is data
    in that partition, be careful in this step as you must recreate the
    partition starting at the same sector as it did before (2048 in my case) or
    you might permanently lose stored data:
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
    If you list the partitions again, you will see the first one occupies all
    sectors in the range 2048-1499999:
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

  <p>Now write the changes to the partition table of the disk:</p>

  <CodeBlock
    code="
    Command (m for help): **w**
    The partition table has been altered!

    Syncing disks.
    "
  />

  <p>
    If you have an ext2/ext3/ext4 filesystem in <code>/dev/sda1</code>, you can
    extend it with resize2fs to make it occupy the full partition size. Before
    doing this, reboot your device to have the kernel recognize the changes to
    the partition table of your disk. Then run:
  </p>

  <CodeBlock code="sudo resize2fs /dev/sda1" />

  <p>
    The filesystem should now occupy the entire size of <code>/dev/sda1</code>.
  </p>
</template>
