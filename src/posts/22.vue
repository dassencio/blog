<template>
  <p>
    To disable the USB devices which are managed by a certain USB
    <a href="https://en.wikipedia.org/wiki/Host_controller">host controller</a>,
    you first need to determine the bus number assigned to it. For that, open a
    terminal and run:
  </p>

  <CodeBlock code="lsusb -t" />

  <p>This is the output I get on my laptop:</p>

  <CodeBlock
    code="
    /:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=ehci_hcd/3p, 480M
        |__ Port 1: Dev 2, If 0, Class=hub, Driver=hub/8p, 480M
            |__ Port 6: Dev 4, If 0, Class=hub, Driver=hub/3p, 12M
                |__ Port 1: Dev 5, If 0, Class=HID, Driver=usbhid, 12M
                |__ Port 2: Dev 6, If 0, Class=HID, Driver=, 12M
                |__ Port 3: Dev 7, If 0, Class='bInterfaceClass 0xe0 not yet handled', Driver=btusb, 12M
                |__ Port 3: Dev 7, If 1, Class='bInterfaceClass 0xe0 not yet handled', Driver=btusb, 12M
                |__ Port 3: Dev 7, If 2, Class=vend., Driver=, 12M
                |__ Port 3: Dev 7, If 3, Class=app., Driver=, 12M
    /:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci_hcd/3p, 480M
        |__ Port 1: Dev 2, If 0, Class=hub, Driver=hub/6p, 480M
            |__ Port 4: Dev 3, If 0, Class='bInterfaceClass 0x0e not yet handled', Driver=uvcvideo, 480M
            |__ Port 4: Dev 3, If 1, Class='bInterfaceClass 0x0e not yet handled', Driver=uvcvideo, 480M
    "
  />

  <p>
    As I described in a
    <RouterLink :to="{ name: '21' }">previous post</RouterLink>, each line
    starting with <code>/:</code> corresponds to a USB host controller which
    manages all devices appearing in the tree associated with it. To disable
    them, run:
  </p>

  <CodeBlock code="echo '<bus>-1' | sudo tee /sys/bus/usb/drivers/usb/unbind" />

  <p>For instance, for <code>Bus 02</code>, run:</p>

  <CodeBlock code="echo '2-1' | sudo tee /sys/bus/usb/drivers/usb/unbind" />

  <p>
    This is the output of <code>lsusb -t</code> which I get after running the
    command above:
  </p>

  <CodeBlock
    code="
    /:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=ehci_hcd/3p, 480M
    /:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci_hcd/3p, 480M
        |__ Port 1: Dev 2, If 0, Class=hub, Driver=hub/6p, 480M
            |__ Port 4: Dev 3, If 0, Class='bInterfaceClass 0x0e not yet handled', Driver=uvcvideo, 480M
            |__ Port 4: Dev 3, If 1, Class='bInterfaceClass 0x0e not yet handled', Driver=uvcvideo, 480M
    "
  />

  <p>
    The second USB host controller (<code>Bus 02</code>) manages the external
    USB ports of my laptop. Before running the command above, I could connect a
    USB drive or an external optical mouse to one of the ports and see them
    appearing in the device tree of <code>Bus 02</code> as well as in the output
    of <a href="https://man7.org/linux/man-pages/man1/dmesg.1.html">dmesg</a>.
    After running the command, this no longer happened.
  </p>

  <p>To reenable the devices managed by a USB host controller, run:</p>

  <CodeBlock code="echo '<bus>-1' | sudo tee /sys/bus/usb/drivers/usb/bind" />

  <p>
    The output of <code>lsusb -t</code> should now show the original USB device
    tree, but the device numbers will be different since they are merely indices
    assigned to USB devices as they are detected.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
