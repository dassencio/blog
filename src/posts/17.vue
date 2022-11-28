<template>
  <p>
    I have recently acquired an
    <a href="http://www.pcengines.ch/alix.htm">Alix board</a> (model
    <a href="http://pcengines.ch/alix2c3.htm">alix2c3</a>) from PC Engines and
    decided to install <a href="http://www.debian.org/">Debian</a>
    on it to use it as a server. This post is a step-by-step tutorial which
    describes how this can be done. I have made the assumption that you're using
    Ubuntu/Debian; if not, you might have to adapt some of the commands below to
    have them work in your distribution.
  </p>

  <p>
    Unfortunately, this task is not as easy as creating a Debian live USB stick,
    then booting and installing from it. The limitation comes from the fact that
    Alix boards are equipped with a very simple firmware (called
    <a href="http://www.pcengines.ch/tinybios.htm">tinyBIOS</a>) which does not
    support booting from a USB drive.
  </p>

  <p>
    Fortunately, there is a slot on the board for a
    <a href="https://en.wikipedia.org/wiki/CompactFlash">Compact Flash</a> (CF)
    card which the tinyBIOS can boot from. The solution is then to build a Linux
    image on a file, flash it directly to a CF card and insert it in the board.
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
    will need to start the installation; all necessary packages which do not
    come with it will be downloaded over the Internet.
  </p>

  <p>
    To download a network install image directly (e.g. for Debian 7.2.0), run:
  </p>

  <CodeBlock
    code="wget http://cdimage.debian.org/debian-cd/7.2.0/i386/iso-cd/debian-7.2.0-i386-netinst.iso"
  />

  <SectionTitle>2) Install QEMU</SectionTitle>

  <p>
    You will need
    <a href="http://wiki.qemu.org/Main_Page">QEMU</a>
    as a machine emulator. We'll use it to create a disk image file (a file
    which can be used as a virtual hard disk) and install Debian on it. To
    install QEMU, run:
  </p>

  <CodeBlock code="sudo apt-get install qemu" />

  <SectionTitle>3) Create a disk image</SectionTitle>

  <p>
    You must first create a 1000MB disk image on a file. The file can be smaller
    than 1000MB (800MB should already be fine), but the installer failed during
    the partitioning step when I used 800MB so I increased the image size to
    make things work smoothly:
  </p>

  <CodeBlock code="qemu-img create debian.img 1000M" />

  <p>
    If you wish, you can make the image bigger than 1000MB. Just make sure you
    don't create an image bigger than the size of your CF card.
  </p>

  <SectionTitle>4) Install Debian on the disk image</SectionTitle>

  <p>Start a virtual machine (VM) with QEMU:</p>

  <CodeBlock
    code="qemu-system-i386 -cdrom <debian-netinst.iso> -hda debian.img -boot d"
  />

  <p>
    with <code>&lt;debian-netinst.iso&gt;</code> replaced by the network install
    CD image you downloaded. This is what each part of the command above
    instructs QEMU to do:
  </p>

  <MapBlock>
    <code>-cdrom debian-netinst.iso</code>
    <span>Use <code>debian-netinst.iso</code> as a CD-ROM disk.</span>

    <code>-hda debian.img</code>
    <span>Use <code>debian.img</code> as a hard disk.</span>

    <code>-boot d</code>
    <span>Boot the VM from the CD-ROM disk.</span>
  </MapBlock>

  <p>
    <b>NOTE</b>: If your mouse pointer gets captured by the VM window, press
    "Ctrl + Alt" (left keys) to recover it.
  </p>

  <p>
    Now follow the steps below. Please keep in mind that these will likely
    differ based on the version of Debian you're installing:
  </p>

  <ListBlock>
    <ListItem>Select "Install".</ListItem>
    <ListItem>Select your language.</ListItem>
    <ListItem>Select your country (for the time zone, locale etc.).</ListItem>
    <ListItem>
      If you're prompted for a locale, choose the one which matches your
      country.
    </ListItem>
    <ListItem>Choose the keymap of your keyboard.</ListItem>
    <ListItem>Enter a hostname for your system (e.g. "alix-board").</ListItem>
    <ListItem>
      Enter your domain name (e.g. "lan", or leave it blank if you wish).
    </ListItem>
    <ListItem>Set the root password.</ListItem>
    <ListItem>You must now create a normal user.</ListItem>
    <ListItem>Choose a username for your user.</ListItem>
    <ListItem>Choose a password for your user.</ListItem>
    <ListItem>Partitioning method: Guided - use entire disk.</ListItem>
    <ListItem>
      Select disk to partition: SCSI1 (0,0,0) (sda) 1.0 GB ATA QEMU HARDDISK.
    </ListItem>
    <ListItem>Partitioning scheme: All files in one partition.</ListItem>
    <ListItem>Select "Finish partitioning and write changes to disk".</ListItem>
    <ListItem>Write the changes to disk? Yes.</ListItem>
    <ListItem>
      The base system will now be installed (this will take a while).
    </ListItem>
    <ListItem>Select a country for a mirror (your country?).</ListItem>
    <ListItem>Debian archive mirror: pick anyone you wish.</ListItem>
    <ListItem>
      HTTP proxy: you probably don't need this (leave it blank).
    </ListItem>
    <ListItem>
      Participate in the package usage survey? This is up to you...
    </ListItem>
    <ListItem>
      Additional things to install: SSH server and standard system utilities.
    </ListItem>
    <ListItem>
      Install the GRUB boot loader to the master boot record? Yes.
    </ListItem>
    <ListItem>Now finish the installation.</ListItem>
  </ListBlock>

  <p>
    Abort the reboot by pressing "Ctrl+C" on the terminal window where you
    started QEMU.
  </p>

  <SectionTitle>
    5) Make sure your packages are NOT for the i686 architecture
  </SectionTitle>

  <p>
    The Alix board has a 32-bit processor (in my case, the processor is an
    <a href="https://en.wikipedia.org/wiki/Geode_(processor)">LX800</a>) whose
    architecture is
    <a
      href="http://myonlineusb.wordpress.com/2011/06/08/what-is-the-difference-between-i386-i486-i586-i686-i786/"
      >i586</a
    >. Most packages from Debian are built for the i486 architecture and will
    work just fine on an i586 processor, but there are two which might not
    follow this rule: libc and the kernel. We need to take a closer look at
    these.
  </p>

  <p>
    To start, boot into your Debian image (I reserved 1024MB of RAM for it; you
    can use less if you wish):
  </p>

  <CodeBlock code="qemu-system-i386 -hda debian.img -m 1024M" />

  <p>
    Now log in as <code>root</code>. To show which libc package(s) you have
    installed, run:
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
    installed since their corresponding lines start with "<code>ii</code>". The
    i686 version is, as the package description says, optimized for the i686
    architecture and therefore undesirable for us, so you should remove it
    (replace <code>libc6</code> with your libc version):
  </p>

  <CodeBlock code="apt-get remove libc6-i686" />

  <p>
    Now let's take a look at the kernel. To find out which installed version(s)
    you have, run:
  </p>

  <CodeBlock code="dpkg --list | grep linux-image" />

  <p>This is the kind of output you should expect:</p>

  <CodeBlock
    code="
    ii  linux-image-3.2.0-4-686-pae          3.2.51-1                  i386         Linux 3.2 for modern PCs
    ii  linux-image-686-pae                  3.2+46                    i386         Linux for modern PCs (meta-package)
    "
  />

  <p>
    This output shows that the installed Linux kernel has been built for the
    i686 architecture. We have to fix this since this kernel will not work on
    the Alix board. First, install the package which contains the kernel for the
    i486 architecture:
  </p>

  <CodeBlock
    code="
    apt-get update
    apt-get install linux-image-486
    "
  />

  <p>
    <b>NOTE</b>: If you have problems connecting to the internet inside the VM,
    try editing the file <code>/etc/resolv.conf</code> and setting the
    <code>nameserver</code> value to the same one you have in the
    <code>/etc/resolv.conf</code> of the computer you're working on (or,
    alternatively, set it to the IP address of a free DNS provider such as
    <code>1.1.1.1</code> or <code>9.9.9.9</code>). This might fix your problem.
  </p>

  <p>
    Reboot and select the i486 kernel on the GRUB screen. Now log in again as
    <code>root</code> and remove all installed kernel packages for the i686
    architecture. You can do that by running:
  </p>

  <CodeBlock code="dpkg --list | grep linux-image.*686" />

  <p>
    and removing every installed kernel package which you see with the following
    command:
  </p>

  <CodeBlock code="apt-get purge linux-image-<version>" />

  <SectionTitle>6) Set a static IP address for your board</SectionTitle>

  <p>Open the file<code>/etc/network/interfaces</code>:</p>

  <CodeBlock code="nano /etc/network/interfaces" />

  <p>
    and add the following to it (remove or comment out whatever is already there
    for <code>eth0</code>):
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
    Above, <code>192.168.1.1</code> is the IP address of my router,
    <code>255.255.255.0</code> is the network mask of my local network and
    <code>192.168.1.254</code> is the desired static IP address for my board.
    Change these numbers according to your network settings.
  </p>

  <p>
    This is what my <code>/etc/network/interfaces</code> looks like (notice that
    I commented out the default configuration for <code>eth0</code>):
  </p>

  <CodeBlock
    code="
    # This file describes the network interfaces available on your system
    # and how to activate them. For more information, see interfaces(5).

    # The loopback network interface
    auto lo
    iface lo inet loopback

    # The primary network interface
    #allow-hotplug eth0
    #iface eth0 inet dhcp

    auto eth0
    iface eth0 inet static
    address 192.168.1.254
    netmask 255.255.255.0
    gateway 192.168.1.1
    "
  />

  <SectionTitle>7) Convert the created disk image to raw format</SectionTitle>

  <p>
    You now need to convert <code>debian.img</code> to a raw disk image. A raw
    disk image can be written (byte by byte) to an actual physical disk and can
    also be generated from a disk by copying its contents (again, byte by byte)
    to a file.
  </p>

  <CodeBlock code="qemu-img convert debian.img -O raw debian.raw" />

  <SectionTitle>8) Flash the raw image to the CF card</SectionTitle>

  <p>Insert a CF card into the card reader of your computer and run:</p>

  <CodeBlock code="dmesg" />

  <p>
    The output will show you the
    <a href="https://en.wikipedia.org/wiki/Device_file">device node</a> through
    which the CF card is accessible. Here are the bottom lines I get right after
    inserting a CF card:
  </p>

  <CodeBlock
    code="
    [649459.289242] sd 28:0:0:1: [sdc] No Caching mode page present
    [649459.289250] sd 28:0:0:1: [sdc] Assuming drive cache: write through
    [649459.289256] sd 28:0:0:1: [sdc] Attached SCSI removable disk
    "
  />

  <p>
    This means the device node for the CF card on my setup is
    <code>/dev/sdc</code>. To flash the raw image to the card, run:
  </p>

  <CodeBlock code="sudo dd if=debian.raw of=/dev/sdX status=progress" />

  <p>
    where <code>/dev/sdX</code> is the device node of your CF card. Above,
    <code>status=progress</code> is optional, but very useful since it will show
    the progress of the data transfer (which may take a while).
  </p>

  <p>
    When this is done, your CF card will be ready to be used. Insert it in the
    board, connect an Ethernet cable to the network port which is right next to
    the board's serial port and turn the board on. If everything goes well,
    after some seconds you will be able to ssh into the board:
  </p>

  <CodeBlock code="ssh root@<ip-of-your-board>" />

  <p>
    If even after a few minutes you still cannot ssh into the board, boot your
    Debian image again using QEMU and make sure you correctly removed the kernel
    and libc packages which were built for the i686 architecture (step 5). If
    everything is correct there, double-check your network configuration (step
    6). Should you find any mistakes, redo steps 7 and 8.
  </p>

  <SectionTitle>
    9) OPTIONAL: Resize the root partition to the whole disk
  </SectionTitle>

  <p>
    For my private servers, I usually prefer storing all operating system and
    user files in a single partition occupying the entire disk to splitting them
    over multiple partitions with dedicated purposes. Also, I almost always
    remove the
    <a href="https://en.wikipedia.org/wiki/Swap_partition">swap partition</a>.
    If you wish to do this as well, ssh into the board and edit the partition
    table of the CF card with:
  </p>

  <CodeBlock code="fdisk /dev/sda" />

  <p>List all partitions:</p>

  <CodeBlock code="Command (m for help): **p**" />

  <p>
    The partition table should look similar to this (most numbers below depend
    on the storage capacity of the CF card; mine has 4GB):
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
    <code>/dev/sda1</code> since this is the partition we wish to extend. This
    value tells us the sector at which the partition starts.
  </p>

  <p>
    Remove the swap partition (in my case, partition number 5 since the swap
    device node is <code>/dev/sda5</code>):
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-5): **5**
    "
  />

  <p>
    Remove the extended partition (in my case, partition number 2 since its
    device node is <code>/dev/sda2</code>):
  </p>

  <CodeBlock
    code="
    Command (m for help): **d**
    Partition number (1-5): **2**
    "
  />

  <p>
    List all partitions again (<code>p</code>). The result should look similar
    to this (I omitted the first lines for brevity):
  </p>

  <CodeBlock
    code="
       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1   *        2048     1853439      925696   83  Linux
    "
  />

  <p>
    To resize the root partition (<code>sda1</code>), you must first delete it
    by entering "<code>d</code>". Fdisk will automatically delete
    <code>sda1</code> as it is the single partition left:
  </p>

  <CodeBlock code="Command (m for help): **d**" />

  <p>
    Now create a new primary partition filling up the entire disk. This
    partition must start at the same sector as <code>sda1</code>
    initially did:
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
    If you list the partitions again (<code>p</code>), you should get the
    following:
  </p>

  <CodeBlock
    code="
       Device Boot      Start         End      Blocks   Id  System
    /dev/sda1            2048     7831151     3914552   83  Linux
    "
  />

  <p>
    You need to make the recreated partition
    <code>sda1</code> bootable again (its "bootable" state is shown in the
    <code>Boot</code> column; if you check the partition table you initially
    had, you will see <code>sda1</code> was bootable since it had a
    "<code>*</code>" under <code>Boot</code>):
  </p>

  <CodeBlock
    code="
    Command (m for help): **a**
    Partition number (1-4): **1**
    "
  />

  <p>
    List the partitions again (<code>p</code>); <code>sda1</code> will now be
    marked as bootable:
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
    it isn't, press "<code>t</code>", then "<code>1</code>", then enter the same
    <code>Id</code> number you previously had.
  </p>

  <p>
    Finally, save the changes to the partition table and exit fdisk. You can
    safely ignore the "Device or resource busy" error:
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

  <p>Now reboot the board:</p>

  <CodeBlock code="reboot" />

  <p>
    Once the board has rebooted, run the following command to resize the
    filesystem of the root partition to the full partition size:
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
