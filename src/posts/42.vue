<template>
  <p>This post describes how to use a Brother DCP-7055 on Linux via USB.</p>

  <p>
    Brother has updated their website, simplifying the installation process by
    providing scripts that do all the work for you. In the end, both printing
    and scanning should work. All you need to do is visit
    <a
      href="http://support.brother.com/g/b/downloadlist.aspx?c=gb&amp;lang=en&amp;prod=dcp7055_all&amp;os=128"
      >this page</a
    >, select your operating system ("Linux (deb)" if you use Ubuntu/Debian or
    "Linux (rpm)" if you use SUSE/Fedora), and download the "Linux brprinter
    installer". Follow the instructions on the page, and you'll be all set!
  </p>

  <SectionTitle>Scanning as a regular user</SectionTitle>

  <p>
    Depending on your system configuration, scanning might only work for
    superusers. The Brother Support website provides
    <a
      href="http://support.brother.com/g/s/id/linux/en/instruction_scn1c.html?c=gb&amp;lang=en&amp;prod=dcp7055_all&amp;redirect=on"
      >instructions</a
    >
    on how to grant scanner access to all users. Alternatively, it's also
    possible to manually give this permission to each user. If you opt for the
    manual method, you must first determine which group has permission to use
    the scanner. To do this, open a terminal and run:
  </p>

  <CodeBlock code="lsusb | grep Brother" />

  <p>
    You should see a line similar to the one below (if you wish to better
    understand the output of the <code>lsusb</code> command, read
    <RouterLink :to="{ name: '21' }">this post</RouterLink>):
  </p>

  <CodeBlock
    code="
    Bus **002** Device **069**: ID 04f9:0248 Brother Industries, Ltd
    "
  />

  <p>
    The highlighted segments indicate the USB bus number and the device number
    assigned to your DCP-7055 (<code>ID 04f9:0248</code> identifies "Brother" as
    the manufacturer and "DCP-7055 scanner/printer" as the device). You can find
    the name of the group with permission to use the scanner by running:
  </p>

  <CodeBlock code="ls -al /dev/bus/usb/<bus-number>/<device-number>" />

  <p>In my case, I ran the following command:</p>

  <CodeBlock code="ls -al /dev/bus/usb/**002**/**069**" />

  <p>and received the following output:</p>

  <CodeBlock
    code="crw-rw-r-- 1 root **lp** 189, 196 Apr 16 13:45 /dev/bus/usb/002/069"
  />

  <p>
    The group name (highlighted) is <code>lp</code>. You can add users to this
    group to grant them permission to scan documents using the command below:
  </p>

  <CodeBlock code="sudo adduser <username> lp" />

  <p>
    If you've just granted scanning permission to a logged-in user, you might
    need to log off and log in again for the changes to take effect for that
    user.
  </p>

  <SectionTitle>Note for Raspberry Pi users</SectionTitle>

  <p>
    At the time of writing this post, the drivers for the DCP-7055 do not
    support ARM processors, so the procedure outlined above will not work on
    devices such as the Raspberry Pi. However, it is possible to use the printer
    as a raw printer, that is, a "dumb" printer that simply prints the input it
    receives without any further processing. A detailed description of the
    properties and limitations of a raw printer can be found
    <a
      href="http://distro.ibiblio.org/smeserver/contribs/rvandenaker/testing/smeserver-cups/documentation/howtos/cups-add-printer.html"
      >here</a
    >. Raspberry Pi users can visit
    <a
      href="http://www.raspberrypi.org/forums/viewtopic.php?t=15526&amp;p=381576"
      >this link</a
    >
    for more details on how to do this.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
