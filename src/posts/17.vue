<template>
  <p>
    I recently acquired an
    <a href="http://www.pcengines.ch/alix.htm">Alix board</a> (model
    <a href="http://pcengines.ch/alix2c3.htm">alix2c3</a>) from PC Engines and
    decided to install <a href="http://www.debian.org/">Debian</a>
    to use the board as a server. This post is a step-by-step tutorial that
    describes the setup work. I assume that you're using Ubuntu/Debian; if not,
    you might have to adapt some of the commands below to have them work in your
    distribution.
  </p>

  <p>
    Unfortunately, this task is not as easy as creating a Debian live USB stick,
    then booting and installing from it. The limitation comes from the fact that
    Alix boards are equipped with a very simple firmware (<a
      href="http://www.pcengines.ch/tinybios.htm"
      >tinyBIOS</a
    >) which does not support booting from a USB drive.
  </p>

  <p>
    Fortunately, there is a slot on the board for a
    <a href="https://en.wikipedia.org/wiki/CompactFlash">Compact Flash</a> (CF)
    card which tinyBIOS can boot from. The solution is then to build a Linux
    image on a file, flash it directly to a CF card, and insert it in the board.
    So let's get started!
  </p>

  <SectionTitle>1) Get a Debian installer image</SectionTitle>

  <p>
    Open a terminal, create and enter a directory where the work will be done:
  </p>

  <CodeBlock
    code="
    mkdir debian
    cd debian
    "
  />

  <p>
    You must now download a Debian installer image. I recommend you download a
    "network install" CD image directly from the
    <a href="http://www.debian.org/CD/netinst/">Debian website</a> for an i386
    architecture. This CD image contains just the minimal amount of software you
    will need to start the installation; all necessary packages that do not come
    with it will be downloaded over the Internet.
  </p>

  <p>
    To download a network install image directly (e.g., for Debian 7.2.0), run:
  </p>

  <CodeBlock
    code="wget http://cdimage.debian.org/debian-cd/7.2.0/i386/iso-cd/debian-7.2.0-i386-netinst.iso"
  />

  <SectionTitle>2) Install QEMU</SectionTitle>

  <p>
    You will need
    <a href="http://wiki.qemu.org/Main_Page">QEMU</a> as a machine emulator. We
    will use it to create a disk image file (a file that can be used as a
    virtual hard disk) and install Debian on it. To install QEMU, run:
  </p>

  <CodeBlock code="sudo apt-get install qemu" />

  <SectionTitle>3) Create a disk image</SectionTitle>

  <p>
    You must first create a 1000 MB disk image in a file. The file can be
    smaller than 1000 MB (800 MB should already be fine), but the installer
    failed during the partitioning step when I used 800 MB so I increased the
    image size to make things work smoothly:
  </p>

  <CodeBlock code="qemu-img create debian.img 1000M" />

  <p>
    You can make the image larger than 1000 MB if you want, as long as your
    image does not exceed the size of your CF card.
  </p>

  <SectionTitle>4) Install Debian on the disk image</SectionTitle>

  <p>Start a virtual machine (VM) with QEMU:</p>

  <CodeBlock
    code="qemu-system-i386 -cdrom debian-netinst.iso -hda debian.img -boot d"
  />

  <p>
    with <code>debian-netinst.iso</code> replaced by the network install CD
    image you downloaded. This is what each part of the command above instructs
    QEMU to do:
  </p>

  <MapBlock>
    <code>-cdrom debian-netinst.iso</code>
    <span>Use <code>debian-netinst.iso</code> as a CD-ROM disk image.</span>

    <code>-hda debian.img</code>
    <span>Use <code>debian.img</code> as a hard disk image.</span>

    <code>-boot d</code>
    <span>Boot the VM from the CD-ROM disk image.</span>
  </MapBlock>

  <NoteBlock>
    If your mouse pointer gets captured by the VM window, press
    <code>Ctrl + Alt</code> (left keys) to release it.
  </NoteBlock>

  <p>
    Now follow the steps below. Keep in mind that these will likely differ based
    on the version of Debian you're installing:
  </p>

  <ListBlock>
    <ListBlockItem>Select "Install".</ListBlockItem>
    <ListBlockItem>Select your language.</ListBlockItem>
    <ListBlockItem>
      Select your country (for the time zone, locale, etc.).
    </ListBlockItem>
    <ListBlockItem>
      If you're prompted for a locale, choose the one which matches your
      country.
    </ListBlockItem>
    <ListBlockItem>Choose the keymap of your keyboard.</ListBlockItem>
    <ListBlockItem>
      Enter a hostname for your system (e.g. "alix-board").
    </ListBlockItem>
    <ListBlockItem>
      Enter your domain name (e.g. "lan", or leave it blank if you wish).
    </ListBlockItem>
    <ListBlockItem>Set the root user password.</ListBlockItem>
    <ListBlockItem>You must now create a normal user.</ListBlockItem>
    <ListBlockItem>Choose a username for your user.</ListBlockItem>
    <ListBlockItem>Choose a password for your user.</ListBlockItem>
    <ListBlockItem>
      Partitioning method: "Guided - use entire disk".
    </ListBlockItem>
    <ListBlockItem>
      Select disk to partition: "SCSI1 (0,0,0) (sda) 1.0 GB ATA QEMU HARDDISK".
    </ListBlockItem>
    <ListBlockItem>
      Partitioning scheme: "All files in one partition".
    </ListBlockItem>
    <ListBlockItem>
      Select "Finish partitioning and write changes to disk".
    </ListBlockItem>
    <ListBlockItem>Write the changes to disk? "Yes".</ListBlockItem>
    <ListBlockItem>
      The base system will now be installed (this will take a while).
    </ListBlockItem>
    <ListBlockItem>
      Select a country for a mirror (your country?).
    </ListBlockItem>
    <ListBlockItem>Debian archive mirror: pick any one you wish.</ListBlockItem>
    <ListBlockItem>
      HTTP proxy: you probably don't need this (leave it blank).
    </ListBlockItem>
    <ListBlockItem>
      Participate in the package usage survey? This is up to you...
    </ListBlockItem>
    <ListBlockItem>
      Additional things to install: "SSH server" and "Standard system
      utilities".
    </ListBlockItem>
    <ListBlockItem>
      Install the GRUB boot loader to the master boot record? "Yes".
    </ListBlockItem>
    <ListBlockItem>Now finish the installation.</ListBlockItem>
  </ListBlock>

  <p>
    Abort the reboot by pressing <code>Ctrl + C</code> in the terminal window
    where you started QEMU.
  </p>

  <SectionTitle>
    5) Make sure your packages are NOT for the i686 architecture
  </SectionTitle>

  <p>
    The Alix board has a 32-bit processor (in my case, the processor is an
    <a href="https://en.wikipedia.org/wiki/Geode_(processor)">LX800</a>), which
    belongs to the
    <a
      href="http://myonlineusb.wordpress.com/2011/06/08/what-is-the-difference-between-i386-i486-i586-i686-i786/"
      >i586 architecture</a
    >. Most packages from Debian are built for the i486 architecture and will
    work just fine on an i586 processor. However, there are two that might not
    follow this rule:
    <a href="https://en.wikipedia.org/wiki/C_standard_library">libc</a> and the
    kernel. We need to take a closer look at these.
  </p>

  <p>
    To begin, boot into your Debian image (I allocated 1024 MB of RAM for it;
    you can use less if you want):
  </p>

  <CodeBlock code="qemu-system-i386 -hda debian.img -m 1024M" />

  <p>
    Now, log in as root. To display which libc package(s) you have installed,
    run:
  </p>

  <CodeBlock code="dpkg --list | grep libc[0-9]" />

  <p>The output should look similar to this:</p>

  <CodeBlock
    code="
    ii  libc6:i386           2.13-38     i386      Embedded GNU C Library: Shared libraries
    ii  libc6-i686:i386      2.13-38     i386      Embedded GNU C Library: Shared libraries [i686 optimized]
    "
  />

  <p>
    In my case, both <code>libc6</code> and <code>libc6-i686</code> are
    installed, as indicated by their corresponding lines starting with
    <code>ii</code>. The i686 version is, as the package description indicates,
    optimized for the i686 architecture and therefore not suitable for our use
    case. You can remove it by running (replace <code>libc6</code> with your
    libc version if it's different):
  </p>

  <CodeBlock code="apt-get remove libc6-i686" />

  <p>
    Now let's examine the kernel. To check which kernel versions are installed,
    run:
  </p>

  <CodeBlock code="dpkg --list | grep linux-image" />

  <p>The output should be similar to this:</p>

  <CodeBlock
    code="
    ii  linux-image-3.2.0-4-686-pae          3.2.51-1                  i386         Linux 3.2 for modern PCs
    ii  linux-image-686-pae                  3.2+46                    i386         Linux for modern PCs (meta-package)
    "
  />

  <p>
    This indicates that the installed Linux kernel is built for the i686
    architecture and therefore not compatible with the Alix board. To fix this
    issue, first install the package that contains the kernel for the i486
    architecture:
  </p>

  <CodeBlock
    code="
    apt-get update
    apt-get install linux-image-486
    "
  />

  <NoteBlock>
    If you encounter issues connecting to the Internet within the VM, consider
    editing the file <code>/etc/resolv.conf</code> and setting the
    <code>nameserver</code> value to match the one in the
    <code>/etc/resolv.conf</code> on your host computer. Alternatively, set it
    to the IP address of a public DNS provider such as <code>1.1.1.1</code> or
    <code>9.9.9.9</code>. This may resolve the connectivity issue.
  </NoteBlock>

  <p>
    After installing the appropriate kernel, reboot the system and select the
    i486 kernel from the GRUB screen. Once the system has booted, log in as root
    and remove any installed kernel packages for the i686 architecture. To do
    this, first run:
  </p>

  <CodeBlock code="dpkg --list | grep linux-image.*686" />

  <p>
    This will list the installed kernel packages for the i686 architecture. You
    can remove each one by using the following command:
  </p>

  <CodeBlock code="apt-get purge linux-image-<version>" />

  <SectionTitle>6) Set a static IP address for your board</SectionTitle>

  <p>Open the network interfaces configuration file by running:</p>

  <CodeBlock code="nano /etc/network/interfaces" />

  <p>
    You need to configure the <code>eth0</code> interface for a static IP
    address. Add the following lines to the file, and comment out or remove any
    existing configuration for <code>eth0</code>:
  </p>

  <CodeBlock
    code="
    auto eth0
    iface eth0 inet static
    address 192.168.1.254
    netmask 255.255.255.0
    gateway 192.168.1.1
    "
  />

  <p>
    In the example above, <code>192.168.1.1</code> is the IP address of the
    router, <code>255.255.255.0</code> is the subnet mask of the local network,
    and <code>192.168.1.254</code> is the static IP address to be assigned to
    the board. Modify these values according to your network configuration.
  </p>

  <p>
    Here is what the entire <code>/etc/network/interfaces</code> file might look
    like in the end (note that the default configuration for
    <code>eth0</code> is commented out):
  </p>

  <CodeBlock
    language="bash"
    code="
    # This file describes the network interfaces available on your system
    # and how to activate them. For more information, see interfaces(5).

    # The loopback network interface
    auto lo
    iface lo inet loopback

    # The primary network interface
    #allow-hotplug eth0
    #iface eth0 inet dhcp

    # Static IP configuration for eth0
    auto eth0
    iface eth0 inet static
    address 192.168.1.254
    netmask 255.255.255.0
    gateway 192.168.1.1
    "
  />

  <SectionTitle>7) Convert the created disk image to raw format</SectionTitle>

  <p>
    After setting up Debian within the QEMU virtual machine, you will need to
    convert the disk image (<code>debian.img</code>) to raw format. The raw
    format allows the image to be written byte-by-byte to a physical disk, which
    is necessary for use with the Alix board.
  </p>

  <CodeBlock code="qemu-img convert debian.img -O raw debian.raw" />

  <SectionTitle>8) Flash the raw image to the CF card</SectionTitle>

  <p>
    Insert a CF card into your computer's card reader. To identify the
    <a href="https://en.wikipedia.org/wiki/Device_file">device node</a> assigned
    to the CF card, use the <code>dmesg</code> command:
  </p>

  <CodeBlock code="dmesg" />

  <p>
    Look for lines similar to the ones below. In this example, the device node
    is <code>/dev/sdc</code>:
  </p>

  <CodeBlock
    code="
    [649459.289242] sd 28:0:0:1: [sdc] No Caching mode page present
    [649459.289250] sd 28:0:0:1: [sdc] Assuming drive cache: write through
    [649459.289256] sd 28:0:0:1: [sdc] Attached SCSI removable disk
    "
  />

  <p>
    Once you have identified the device node for your CF card, use the
    <code>dd</code> command to write the raw image to the card. Replace
    <code>/dev/sdX</code> with the correct device node for your CF card in the
    command below:
  </p>

  <CodeBlock code="sudo dd if=debian.raw of=/dev/sdX status=progress" />

  <p>
    The <code>status=progress</code> option is not mandatory but is useful for
    monitoring the progress of the data transfer. This process can take some
    minutes to complete.
  </p>

  <p>
    After the <code>dd</code> command finishes, your CF card is ready to be
    inserted into the Alix board. Connect the board to your network with an
    Ethernet cable plugged into the network port next to the board's serial
    port, and power on the board. If everything has been configured correctly,
    you should be able to SSH into the board after a few moments using the
    command below, with <code>&lt;ip-of-your-board&gt;</code> being the static
    IP address you assigned to the board earlier:
  </p>

  <CodeBlock code="ssh root@<ip-of-your-board>" />

  <p>
    If you're unable to SSH into the board even after waiting for a few minutes,
    you should boot your Debian image again using QEMU to verify that the kernel
    and libc packages built for the i686 architecture were properly removed as
    per step 5. Also, ensure that the network configuration was correctly set up
    in step 6. If you find any errors, you will need to redo steps 7 and 8.
  </p>

  <SectionTitle>
    9) OPTIONAL: Resize the root partition to use the entire disk
  </SectionTitle>

  <p>
    If you prefer to have a single partition occupying the entire disk for both
    operating system and user files, you may want to resize the root partition
    and remove the
    <a href="https://en.wikipedia.org/wiki/Swap_partition">swap partition</a>.
    To do this, SSH into the board and edit the partition table of the CF card
    by using the <code>fdisk</code> command:
  </p>

  <CodeBlock code="fdisk /dev/sda" />

  <p>
    Once inside <code>fdisk</code>, list all partitions by entering the
    <code>p</code> command:
  </p>

  <CodeBlock code="Command (m for help): **p**" />

  <p>
    The partition table should look similar to the example below. The exact
    numbers will vary depending on the storage capacity of your CF card.
  </p>

  <CodeBlock
    code="
    Disk /dev/sda: 4009 MB, 4009549824 bytes
    5 heads, 35 sectors/track, 44749 cylinders, total 7831152 sectors
    Units = sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disk identifier: 0x00020a69

       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1   *        2048     1853439      925696   83  Linux
    /dev/sda2         1855486     2045951       95233    5  Extended
    /dev/sda5         1855488     2045951       95232   82  Linux swap / Solaris
    "
  />

  <p>
    Write down the number in the <code>Start</code> column for
    <code>/dev/sda1</code>, as this value indicates the sector where the
    partition to be extended starts.
  </p>

  <p>
    Next, remove the swap partition, which is number 5 in this example, as
    indicated by the device node <code>/dev/sda5</code> above:
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-5): **5**
    "
  />

  <p>
    Next, remove the extended partition, which is number 2 in this example, as
    indicated by the device node <code>/dev/sda2</code> above:
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-5): **2**
    "
  />

  <p>
    Now, list all the partitions again by entering <code>p</code>. The output
    should look similar to this (first few lines omitted for brevity):
  </p>

  <CodeBlock
    code="
       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1   *        2048     1853439      925696   83  Linux
    "
  />

  <p>
    To resize the root partition (<code>sda1</code>), you must first delete it
    by entering <code>d</code>. <code>fdisk</code> will automatically delete
    <code>sda1</code> since it's the only partition left on the disk:
  </p>

  <CodeBlock code="Command (m for help): **d**" />

  <p>
    Next, create a new primary partition that will utilize the entire disk. Make
    sure this partition starts at the same sector that
    <code>sda1</code> originally started at:
  </p>

  <CodeBlock
    code="
    Command (m for help): **n**
    Partition type:
      p   primary (0 primary, 0 extended, 4 free)
      e   extended
    Select (default p): **p**
    Partition number (1-4, default 1): **1**
    First sector (2048-7831151, default 2048): **<start-sector-of-sda1>**
    Last sector, +sectors or +size{K,M,G} (2048-7831151, default 7831151): **(press Enter)**
    Using default value 7831151
    "
  />

  <p>
    If you list the partitions again by entering <code>p</code>, the output
    should resemble the following:
  </p>

  <CodeBlock
    code="
       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1            2048     7831151     3914552   83  Linux
    "
  />

  <p>
    The recreated partition <code>sda1</code> needs to be set as bootable again.
    As you can see in the initial partition table, <code>sda1</code> was marked
    bootable (indicated by an asterisk under the <code>Boot</code> column).
    Let's set the new partition as bootable:
  </p>

  <CodeBlock
    code="
    Command (m for help): **a**
    Partition number (1-4): **1**
    "
  />

  <p>
    If you list the partitions one more time using <code>p</code>, you will see
    that <code>sda1</code> is now marked as bootable:
  </p>

  <CodeBlock
    code="
       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1   *        2048     7831151     3914552   83  Linux
    "
  />

  <p>
    Make sure the partition type of <code>sda1</code> (the value shown under
    <code>Id</code>) is the same as before. It should be, but if for some reason
    it isn't, press <code>t</code>, then <code>1</code>, then enter the same
    <code>Id</code> number you previously had.
  </p>

  <p>
    Finally, save the changes to the partition table and exit
    <code>fdisk</code>. You can safely ignore the "Device or resource busy"
    error:
  </p>

  <CodeBlock
    code="
    Command (m for help): **w**
    The partition table has been altered!

    Calling ioctl() to re-read partition table.

    WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
    The kernel still uses the old table. The new table will be used at
    the next reboot or after you run partprobe(8) or kpartx(8)
    Syncing disks.
    "
  />

  <p>Now reboot the system:</p>

  <CodeBlock code="reboot" />

  <p>
    Once it has rebooted, run the following command to resize the file system of
    the root partition to the full partition size:
  </p>

  <CodeBlock code="resize2fs /dev/sda1" />

  <p>
    Your root partition (mounted on <code>/</code>) should fill up the entire
    disk now (or most of it anyway since there is a little bit of booting data
    at the beginning of the disk and the first partition does not start right
    after that data). Reboot once again to make sure everything is fine. After
    rebooting, run:
  </p>

  <CodeBlock code="df -h" />

  <p>This is the kind of output you should expect:</p>

  <CodeBlock
    code="
    Filesystem                              Size  Used Avail Use% Mounted on
    /dev/disk/by-uuid/<some-long-string>    3.7G  693M  2.9G  20% /
    "
  />

  <SectionTitle>10) Enjoy your server</SectionTitle>

  <p>Your server is now ready to be used. Have fun with it! :-)</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
