<template>
  <p>
    On Linux, you can list all
    <a href="https://en.wikipedia.org/wiki/USB">USB</a> devices connected to a
    host (a computer) using a CLI tool called
    <a href="http://linux.die.net/man/8/lsusb">lsusb</a>. In this post, I will
    show how to interpret the information contained in its output. To start,
    open a terminal and run:
  </p>

  <CodeBlock code="lsusb -t" />

  <p>This is the output I get in my laptop:</p>

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
    The output shows a list of USB
    <a href="https://en.wikipedia.org/wiki/Host_controller">host controllers</a>
    (the lines starting with <code>Bus</code>) and their connected devices on a
    tree structure. This tree describes the actual physical hierarchy of the USB
    devices, i.e., which device is connected to what. At the end of each line,
    the negotiated communication speed of each device is shown in Mbits/s. The
    12Mbit/s mode (<code>12M</code>) is called "Full Speed" and is used for
    communicating with keyboards, mice, joysticks and similar devices. The
    480Mbit/s mode (<code>480M</code>) is called "Hi-Speed" and is used for
    communicating with storage devices, webcams and other devices for which more
    bandwidth is required. All my ports are USB 2.0; for
    <a href="https://en.wikipedia.org/wiki/USB_3.0">USB 3.0</a>, there is also a
    communication mode which supports 5000Mbit/s (5Gbit/s).
  </p>

  <p>
    As the output shows, my laptop has two USB host controllers. Both
    controllers are managed by an
    <a
      href="https://en.wikipedia.org/wiki/Host_controller_interface_%28USB%2C_Firewire%29"
    >
      ECHI</a
    >
    driver (<code>Driver=ehci_hcd/3p</code>). Indeed, USB 2.0 ports must be
    managed by either an EHCI or an
    <a
      href="https://en.wikipedia.org/wiki/EXtensible_Host_Controller_Interface_%28xHCI%29"
      >xHCI</a
    >
    driver. Each host controller contains a hub directly attached to it called a
    <a href="http://sdpha2.ucsd.edu/Lab_Equip_Manuals/usb_20.pdf">root hub</a>
    (notice the string <code>Class=root_hub</code> in their lines).
  </p>

  <p>
    The device numbers are indices which are attributed to USB devices as they
    are detected, so if you remove a device and reinsert it, it may come up
    again with a different device number.
  </p>

  <p>
    Now let's focus on <code>Bus 02</code>. There is a
    <a href="https://en.wikipedia.org/wiki/USB_hub">USB hub</a>
    connected to its <code>Port 1</code> (<code>Dev 2</code> means "device 2").
    A second USB hub is attached to <code>Port 6</code> of the first USB hub
    (device 4). There are several devices attached to this second hub. Although
    both USB hubs are internal (they are physically inside my laptop), the first
    hub is connected to the external USB ports (the ones I can directly access)
    while all ports of the second hub are internal. Indeed, if I connect a USB
    disk to one of my USB ports, the output of <code>lsusb -t</code> becomes:
  </p>

  <CodeBlock
    code="
    /:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=ehci_hcd/3p, 480M
        |__ Port 1: Dev 2, If 0, Class=hub, Driver=hub/8p, 480M
            **|__ Port 2: Dev 8, If 0, Class=stor., Driver=usb-storage, 480M**
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
    The highlighted line shows a new USB device (a storage device) directly
    connected to the first USB hub of <code>Bus 02</code> (I have tried every
    single USB port in my laptop: the USB disk is always detected in a port from
    that hub). To find out more about the devices in the second hub, I ran:
  </p>

  <CodeBlock code="lsusb" />

  <p>and got this output:</p>

  <CodeBlock
    code="
    Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 001 Device 002: ID 8087:0020 Intel Corp. Integrated Rate Matching Hub
    Bus 002 Device 002: ID 8087:0020 Intel Corp. Integrated Rate Matching Hub
    Bus 001 Device 003: ID 0c45:6460 Microdia
    Bus 002 Device 004: ID 0a5c:4500 Broadcom Corp. BCM2046B1 USB 2.0 Hub (part of BCM2046 Bluetooth)
    **Bus 002 Device 005: ID 413c:8161 Dell Computer Corp. Integrated Keyboard**
    **Bus 002 Device 006: ID 413c:8162 Dell Computer Corp. Integrated Touchpad [Synaptics]**
    **Bus 002 Device 007: ID 413c:8160 Dell Computer Corp. Wireless 365 Bluetooth**
    "
  />

  <p>
    The highlighted devices are the ones which are connected to the second hub
    of <code>Bus 02</code>. They are assigned device numbers 5, 6 and 7. Device
    5 is my laptop's keyboard and device 6 is my touchpad. This makes sense
    since the
    <a href="https://en.wikipedia.org/wiki/USB#Device_classes">class</a> of
    these devices (shown in the output of <code>lsusb -t</code>) is
    <a href="https://en.wikipedia.org/wiki/USB_human_interface_device_class"
      >HID</a
    >
    (Human Interface Device). Device 7 is my Bluetooth card. As I initially
    suspected, all ports from the second hub are indeed internal.
  </p>

  <p>
    Strings such as <code>ID 413c:8161</code> indicate that the vendor ID is
    <code>413c</code> (Dell Computer Corp.) and the product ID is
    <code>8161</code> (Integrated Keyboard). To clarify, each USB device
    contains a vendor ID and a product ID (companies
    <a href="http://www.usb.org/developers/vendor/">pay</a> to acquire vendor
    IDs from the <a href="http://www.usb.org/about">USB Implementers Forum</a>).
    A list of vendor IDs with their respective product IDs can be found
    <a href="http://www.linux-usb.org/usb.ids">here</a>.
  </p>

  <p>
    If the output from <code>lsusb</code> is too long, you can restrict it to a
    specific USB device by running:
  </p>

  <CodeBlock code="lsusb -s <bus>:<device-number>" />

  <p>For example, with <code>bus=2</code> and <code>device=5</code>:</p>

  <CodeBlock code="lsusb -s 2:5" />

  <p>I get the following:</p>

  <CodeBlock
    code="
    Bus 002 Device 005: ID 413c:8161 Dell Computer Corp. Integrated Keyboard
    "
  />

  <SectionTitle>Bonus: <code>usb-devices</code></SectionTitle>

  <p>
    If lsusb does not give you the information you want for a given device, try
    running:
  </p>

  <CodeBlock code="usb-devices" />

  <p>
    This will show you a comprehensive and very detailed list of your USB
    devices. With the bus and device numbers, you can go through the list and
    see if it provides more information about the device you're interested in.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
