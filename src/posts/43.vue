<template>
  <p>
    On Linux, the
    <a href="http://linux.die.net/man/8/mount"><code>mount -l</code></a> command
    (or simply <code>mount</code>) is often used to list all mounted partitions
    on a system. Conversely,
    <a href="http://linux.die.net/man/8/fdisk"><code>fdisk -l</code></a>
    is commonly used to list all partitions from any device that contains a
    partition table, with hard disks being the most common examples. However,
    there is an alternative tool that combines some functionalities of both
    these tools and provides a pleasing output:
    <a href="http://linux.die.net/man/8/lsblk"><code>lsblk</code></a
    >.
  </p>

  <p>
    The <code>lsblk</code> command lists all
    <a href="https://en.wikipedia.org/wiki/Device_file#Block_devices"
      >block devices</a
    >
    in the system as trees. If a device is mounted, its mounting point is also
    displayed. The output of <code>lsblk</code> on my laptop is shown below.
    Note that both
    <a
      href="http://www.tldp.org/HOWTO/Partition-Mass-Storage-Definitions-Naming-HOWTO/x183.html"
      >major and minor numbers</a
    >
    and partition sizes are displayed:
  </p>

  <CodeBlock
    code="
    NAME                  MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
    sda                     8:0    0 465.8G  0 disk
    ├─sda1                  8:1    0     1K  0 part
    ├─sda2                  8:2    0 433.1G  0 part
    │ └─data (dm-1)       252:1    0 433.1G  0 crypt /media/data
    ├─sda3                  8:3    0   3.7G  0 part
    │ └─cryptswap1 (dm-0) 252:0    0   3.7G  0 crypt [SWAP]
    ├─sda4                  8:4    0    15G  0 part  /
    ├─sda5                  8:5    0   9.3G  0 part
    └─sda6                  8:6    0   4.7G  0 part  /home
    sr0                    11:0    1  1024M  0 rom
    sdb                     8:16   1  14.5G  0 disk
    └─sdb1                  8:17   1  14.5G  0 part
    "
  />

  <p>Let's first go over the partitions of my main disk (<code>sda</code>):</p>

  <MapBlock>
    <code>sda1</code>
    <span>
      <a href="https://en.wikipedia.org/wiki/Disk_partitioning"
        >Extended partition</a
      >
      that contains <code>sda5</code> and <code>sda6</code>. While
      <code>lsblk</code>
      interprets it as a small partition containing the first
      <a href="https://en.wikipedia.org/wiki/Extended_partition">EBR</a> of this
      extended partition, <code>fdisk</code> would provide a more explicit
      display of this extended partition.
    </span>

    <code>sda2</code>
    <span>Encrypted partition mounted at <code>/media/data</code>.</span>

    <code>sda3</code>
    <span>Encrypted swap partition.</span>

    <code>sda4</code>
    <span
      >Partition that holds the operating system files and is mounted at
      <code>/</code>.</span
    >

    <code>sda5</code>
    <span>Currently not in use.</span>

    <code>sda6</code>
    <span>Partition that houses the user home directories.</span>
  </MapBlock>

  <p>
    The output also shows my CD-ROM drive (<code>sr0</code>) and another disk
    (<code>sdb</code>), which is an attached USB disk containing a single
    partition (<code>sdb1</code>) that is not mounted anywhere. Since
    <code>lsblk</code> only lists block devices, it will not display encrypted
    home directories mounted with <code>ecryptfs</code> or partitions mounted
    with <code>sshfs</code>, for example.
  </p>

  <p>
    The <code>mount</code> command lists all mounted partitions from physical
    disks as well as RAM disks but does not list unmounted partitions. Although
    it provides rich details, visually extracting information from its output is
    not as straightforward as with <code>lsblk</code>. Here is the output of
    <code>mount</code> on my laptop:
  </p>

  <CodeBlock
    code="
    /dev/sda4 on / type ext4 (rw,errors=remount-ro)
    proc on /proc type proc (rw,noexec,nosuid,nodev)
    sysfs on /sys type sysfs (rw,noexec,nosuid,nodev)
    none on /sys/fs/fuse/connections type fusectl (rw)
    none on /sys/kernel/debug type debugfs (rw)
    none on /sys/kernel/security type securityfs (rw)
    udev on /dev type devtmpfs (rw,mode=0755)
    devpts on /dev/pts type devpts (rw,noexec,nosuid,gid=5,mode=0620)
    tmpfs on /run type tmpfs (rw,noexec,nosuid,size=10%,mode=0755)
    none on /run/lock type tmpfs (rw,noexec,nosuid,nodev,size=5242880)
    none on /run/shm type tmpfs (rw,nosuid,nodev)
    /dev/sda6 on /home type ext4 (rw)
    binfmt_misc on /proc/sys/fs/binfmt_misc type binfmt_misc (rw,noexec,nosuid,nodev)
    **/home/myuser/.Private on /home/myuser type ecryptfs (ecryptfs_check_dev_ruid...)**
    /dev/mapper/data on /media/data type ext4 (rw)
    "
  />

  <p>
    Note how the mount point for my encrypted home directory (highlighted) and
    all the virtual and temporary file systems of types sysfs, proc, tmpfs, etc.
    are displayed.
  </p>

  <p>
    While <code>mount</code> typically maintains a list of mounted partitions in
    <code>/etc/mtab</code> and uses that file to display them to the user,
    <code>lsblk</code> gathers information directly from
    <a href="https://en.wikipedia.org/wiki/Sysfs">sysfs</a>.
  </p>

  <p>
    Lastly, <code>lsblk</code> can format its output as a list using the
    <code>-l</code> option, and it can also display information about the
    topology of each block device (e.g., sector size) and device ownerships
    using the <code>-t</code> and <code>-m</code> options, respectively. For
    more information, refer to the <code>lsblk</code> manual:
  </p>

  <CodeBlock code="man lsblk" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
