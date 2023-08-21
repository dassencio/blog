<template>
  <p>
    On Linux, you can list and inspect all PCI devices connected to a host (a
    computer) using a CLI tool called
    <a href="http://linux.die.net/man/8/lspci"><code>lspci</code></a
    >. This tool is typically included in the <code>pciutils</code> package,
    which is pre-installed on most Linux distributions.
  </p>

  <p>
    In this post, we will explore the output of <code>lspci</code> and learn how
    to interpret it. We will also briefly discuss the PCI configuration space,
    which is a set of registers that each PCI device possesses and which
    contains information about the device.
  </p>

  <p>
    To start, open a terminal and run <code>lspci</code> without any arguments:
  </p>

  <CodeBlock code="lspci" />

  <p>Here is the output from my laptop:</p>

  <CodeBlock
    code="
    00:00.0 Host bridge: Intel Corporation Haswell-ULT DRAM Controller (rev 0b)
    00:02.0 VGA compatible controller: Intel Corporation Haswell-ULT Integrated Graphics Controller (rev 0b)
    00:03.0 Audio device: Intel Corporation Haswell-ULT HD Audio Controller (rev 0b)
    00:14.0 USB controller: Intel Corporation Lynx Point-LP USB xHCI HC (rev 04)
    00:16.0 Communication controller: Intel Corporation Lynx Point-LP HECI #0 (rev 04)
    00:1b.0 Audio device: Intel Corporation Lynx Point-LP HD Audio Controller (rev 04)
    00:1d.0 USB controller: Intel Corporation Lynx Point-LP USB EHCI #1 (rev 04)
    00:1f.0 ISA bridge: Intel Corporation Lynx Point-LP LPC Controller (rev 04)
    00:1f.2 SATA controller: Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode] (rev 04)
    00:1f.3 SMBus: Intel Corporation Lynx Point-LP SMBus Controller (rev 04)
    "
  />

  <p>
    Each line in the output above represents a PCI device. Every device
    <a href="http://www.makelinux.net/ldd3/chp-12-sect-1.shtml">is assigned</a>
    a bus number, a device number, and a function number. On Linux, PCI devices
    also receive domain numbers. However, these are often omitted by
    <code>lspci</code> since, in many cases, all devices share the same domain
    number (typically zero). Linux assigns these four numbers to each device
    during boot or when a device is hot-plugged. As the PCI specification
    <a href="https://en.wikipedia.org/wiki/PCI_configuration_space"
      >allows for up to 256 buses</a
    >, nonzero domain numbers are primarily used to group PCI buses in
    exceptionally large systems. Each bus can support up to 32 devices, and each
    PCI device can have up to eight functions. In technical terms, a device's
    location is denoted by a 16-bit domain number, an 8-bit bus number, a 5-bit
    device number, and a 3-bit function number. The last three numbers are
    frequently referred to as the device's BDF or B/D/F (standing for
    bus/device/function).
  </p>

  <p>Let's dissect one of the output lines above. Consider the first line:</p>

  <CodeBlock
    code="
    **00:00.0** Host bridge: Intel Corporation Haswell-ULT DRAM Controller (rev 0b)
    "
  />

  <p>
    The highlighted segment of this line displays the device's BDF: its bus
    number is <code>00</code>, its device number is <code>00</code>, and its
    function number is <code>0</code>. The device belongs to the "Host bridge"
    class, its vendor is "Intel Corporation", its name is "Haswell-ULT DRAM
    Controller", and its revision ("rev") is <code>11</code> (represented as
    <code>0b</code> in hexadecimal notation). The revision number indicates the
    device's chipset and firmware versions. This specific device is a PCI host
    bridge, which
    <a href="https://docs.oracle.com/cd/E19683-01/806-5222/hwovr-22/"
      >serves as a connection</a
    >
    between all PCI devices and buses on one end, and the processor and main
    memory on the other.
  </p>

  <p>Now, consider the second-to-last line:</p>

  <CodeBlock
    code="
    **00:1f.2** SATA controller: Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode] (rev 04)
    "
  />

  <p>
    This line represents a device with bus number <code>00</code>, device number
    <code>1f</code>, and function number <code>2</code>. The device falls under
    the "SATA controller" category, is manufactured by "Intel Corporation", and
    is named "Lynx Point-LP SATA Controller 1 [AHCI mode]". Essentially, it's a
    SATA
    <a href="https://en.wikipedia.org/wiki/Controller_%28computing%29"
      >controller</a
    >
    operating in the
    <a href="https://en.wikipedia.org/wiki/Advanced_Host_Controller_Interface"
      >AHCI</a
    >
    mode. It's worth noting that this SATA controller is recognized as a
    function of a device that also houses an
    <a href="https://en.wikipedia.org/wiki/Industry_Standard_Architecture"
      >ISA</a
    >
    bridge (to be exact, a
    <a
      href="https://web.archive.org/web/20151106050608/http://www.intel.com/assets/pdf/whitepaper/318244.pdf"
      >PCI/ISA bridge</a
    >) and an
    <a href="https://en.wikipedia.org/wiki/System_Management_Bus">SMBus</a>
    controller. This can be deduced from the fact that they all possess
    identical device and bus numbers, but their function numbers differ.
  </p>

  <p>
    An obvious question that might arise is: how does the operating system
    determine the class, name, and vendor of a PCI device? The mechanism is
    straightforward. Every PCI device possesses a set of registers, known as the
    device's
    <a href="https://en.wikipedia.org/wiki/PCI_configuration_space"
      >configuration space</a
    >, which presents,
    <a href="http://wiki.osdev.org/PCI#PCI_Device_Structure">among other data</a
    >, the device ID (DID), vendor ID (VID), and the device class to the
    operating system. These numeric codes are then translated by the operating
    system into human-readable names using a predefined table. Vendor IDs are
    assigned by an organization known as the
    <a href="https://en.wikipedia.org/wiki/PCI-SIG"
      >PCI Special Interest Group</a
    >, while device IDs are allocated by the respective vendors. These IDs can
    be shown in the output of <code>lspci</code> with the <code>-nn</code> flag:
  </p>

  <CodeBlock code="lspci -nn" />

  <p>
    The output closely mirrors what we observed earlier, but now includes the
    class code, vendor ID, and device ID for each device. Note that the vendor
    and device IDs are combined in the format
    <code>[vendor-id:device-id]</code>:
  </p>

  <CodeBlock
    code="
    00:00.0 Host bridge [**0600**]: Intel Corporation Haswell-ULT DRAM Controller [**8086:0a04**] (rev 0b)
    00:02.0 VGA compatible controller [**0300**]: Intel Corporation Haswell-ULT Integrated Graphics Controller [**8086:0a16**] (rev 0b)
    00:03.0 Audio device [**0403**]: Intel Corporation Haswell-ULT HD Audio Controller [**8086:0a0c**] (rev 0b)
    00:14.0 USB controller [**0c03**]: Intel Corporation Lynx Point-LP USB xHCI HC [**8086:9c31**] (rev 04)
    00:16.0 Communication controller [**0780**]: Intel Corporation Lynx Point-LP HECI #0 [**8086:9c3a**] (rev 04)
    00:1b.0 Audio device [**0403**]: Intel Corporation Lynx Point-LP HD Audio Controller [**8086:9c20**] (rev 04)
    00:1d.0 USB controller [**0c03**]: Intel Corporation Lynx Point-LP USB EHCI #1 [**8086:9c26**] (rev 04)
    00:1f.0 ISA bridge [**0601**]: Intel Corporation Lynx Point-LP LPC Controller [**8086:9c43**] (rev 04)
    00:1f.2 SATA controller [**0106**]: Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode] [**8086:9c03**] (rev 04)
    00:1f.3 SMBus [**0c05**]: Intel Corporation Lynx Point-LP SMBus Controller [**8086:9c22**] (rev 04)
    "
  />

  <p>
    As we previously discussed, domain numbers are typically omitted since they
    usually default to zero. However, if you would like to force
    <code>lspci</code> to display these domain numbers, use the
    <code>-D</code> flag:
  </p>

  <CodeBlock code="lspci -D" />

  <p>
    Based on the output from my laptop shown below, it's evident that each
    device is assigned the domain number <code>0000</code>. However, it's
    important to emphasize that the domain number can technically range from
    <code>0000</code> to <code>ffff</code>, allowing for a total of 65536
    possible domain numbers.
  </p>

  <CodeBlock
    code="
    **0000**:00:00.0 Host bridge: Intel Corporation Haswell-ULT DRAM Controller (rev 0b)
    **0000**:00:02.0 VGA compatible controller: Intel Corporation Haswell-ULT Integrated Graphics Controller (rev 0b)
    **0000**:00:03.0 Audio device: Intel Corporation Haswell-ULT HD Audio Controller (rev 0b)
    **0000**:00:14.0 USB controller: Intel Corporation Lynx Point-LP USB xHCI HC (rev 04)
    **0000**:00:16.0 Communication controller: Intel Corporation Lynx Point-LP HECI #0 (rev 04)
    **0000**:00:1b.0 Audio device: Intel Corporation Lynx Point-LP HD Audio Controller (rev 04)
    **0000**:00:1d.0 USB controller: Intel Corporation Lynx Point-LP USB EHCI #1 (rev 04)
    **0000**:00:1f.0 ISA bridge: Intel Corporation Lynx Point-LP LPC Controller (rev 04)
    **0000**:00:1f.2 SATA controller: Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode] (rev 04)
    **0000**:00:1f.3 SMBus: Intel Corporation Lynx Point-LP SMBus Controller (rev 04)
    "
  />

  <p>
    The PCI devices can be displayed in a tree-like structure, which reflects
    the actual physical structure of the PCI buses. To view it, run:
  </p>

  <CodeBlock code="lspci -tv" />

  <p>
    The <code>-v</code> flag includes the device vendors and names in the
    output, but it can be omitted if you don't need them. As the output below
    indicates, all PCI devices on my laptop are connected to the same bus
    (<code>00</code>):
  </p>

  <CodeBlock
    code="
    -[0000:00]-+-00.0  Intel Corporation Haswell-ULT DRAM Controller
               +-02.0  Intel Corporation Haswell-ULT Integrated Graphics Controller
               +-03.0  Intel Corporation Haswell-ULT HD Audio Controller
               +-14.0  Intel Corporation Lynx Point-LP USB xHCI HC
               +-16.0  Intel Corporation Lynx Point-LP HECI #0
               +-1b.0  Intel Corporation Lynx Point-LP HD Audio Controller
               +-1d.0  Intel Corporation Lynx Point-LP USB EHCI #1
               +-1f.0  Intel Corporation Lynx Point-LP LPC Controller
               +-1f.2  Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode]
               \-1f.3  Intel Corporation Lynx Point-LP SMBus Controller
    "
  />

  <p>
    Below is a representation of what the output from
    <code>lspci -tv</code> might resemble on a larger system, such as a server.
    For the sake of brevity, certain parts of the output are omitted. It's
    important to note that while all domain numbers are zero, the devices aren't
    necessarily connected to the same bus:
  </p>

  <CodeBlock
    code="
    -+-[0000:3f]-+-00.0  Intel Corporation Xeon 5600 Series QuickPath Architecture Generic Non-core Registers
     |           +-00.1  Intel Corporation Xeon 5600 Series QuickPath Architecture System Address Decoder
     |           +-02.0  Intel Corporation Xeon 5600 Series QPI Link 0
    ...
     +-[0000:3e]-+-00.0  Intel Corporation Xeon 5600 Series QuickPath Architecture Generic Non-core Registers
     |           +-00.1  Intel Corporation Xeon 5600 Series QuickPath Architecture System Address Decoder
     |           +-02.0  Intel Corporation Xeon 5600 Series QPI Link 0
     ...
     \-[0000:00]-+-00.0  Intel Corporation 5520 I/O Hub to ESI Port
                 +-01.0-[05]----00.0  Hewlett-Packard Company Smart Array G6 controllers
                 +-02.0-[06]--
                 +-03.0-[11-13]--
                 +-04.0-[14]--
                 +-05.0-[15-17]--
                 +-06.0-[18-1a]--
                 +-07.0-[0e-10]--
                 +-08.0-[0b-0d]--
                 +-09.0-[08-0a]----00.0  Hewlett-Packard Company Smart Array G6 controllers
                 +-0a.0-[07]--
    ...
                 +-1c.0-[03]--+-00.0  Broadcom Corporation NetXtreme II BCM5709 Gigabit Ethernet
                 |            \-00.1  Broadcom Corporation NetXtreme II BCM5709 Gigabit Ethernet
                 +-1c.2-[04]--+-00.0  Broadcom Corporation NetXtreme II BCM5709 Gigabit Ethernet
                 |            \-00.1  Broadcom Corporation NetXtreme II BCM5709 Gigabit Ethernet
                 +-1c.4-[02]--+-00.0  Hewlett-Packard Company Integrated Lights-Out Standard Slave Instrumentation &amp; System Support
                 |            +-00.2  Hewlett-Packard Company Integrated Lights-Out Standard Management Processor Support and Messaging
    ...
                 +-1d.3  Intel Corporation 82801JI (ICH10 Family) USB UHCI Controller #6
                 +-1d.7  Intel Corporation 82801JI (ICH10 Family) USB2 EHCI Controller #1
                 +-1e.0-[01]----03.0  Advanced Micro Devices [AMD] nee ATI ES1000
                 \-1f.0  Intel Corporation 82801JIB (ICH10) LPC Interface Controller
    "
  />

  <p>
    For a more detailed view of the PCI devices, you can use
    <code>lspci</code> with the flags <code>-v</code>, <code>-vv</code>, or
    <code>-vvv</code>. The number of <code>v</code>'s determines the depth of
    the details; however, most users will find <code>-v</code> sufficient as the
    deeper details provided by the other flags may not be relevant for general
    use:
  </p>

  <CodeBlock code="lspci -v" />

  <p>
    Using this command produces a considerably lengthier output. To keep it
    concise, only the details for the first three devices are displayed below.
    Note that the output specifies the kernel driver in use for each device,
    excluding the host bridge. In order to fully view the capabilities of each
    device, you may need to execute <code>lspci</code> with root privileges.
  </p>

  <CodeBlock
    code="
    00:00.0 Host bridge: Intel Corporation Haswell-ULT DRAM Controller (rev 0b)
      Subsystem: Lenovo Device 3978
      Flags: bus master, fast devsel, latency 0
      Capabilities: [e0] Vendor Specific Information: Len=0c &lt;?&gt;

    00:02.0 VGA compatible controller: Intel Corporation Haswell-ULT Integrated Graphics Controller (rev 0b) (prog-if 00 [VGA controller])
      Subsystem: Lenovo Device 3978
      Flags: bus master, fast devsel, latency 0, IRQ 58
      Memory at b0000000 (64-bit, non-prefetchable) [size=4M]
      Memory at a0000000 (64-bit, prefetchable) [size=256M]
      I/O ports at 4000 [size=64]
      Expansion ROM at &lt;unassigned&gt; [disabled]
      Capabilities: [90] MSI: Enable+ Count=1/1 Maskable- 64bit-
      Capabilities: [d0] Power Management version 2
      Capabilities: [a4] PCI Advanced Features
      Kernel driver in use: i915

    00:03.0 Audio device: Intel Corporation Haswell-ULT HD Audio Controller (rev 0b)
      Subsystem: Lenovo Device 3978
      Flags: bus master, fast devsel, latency 0, IRQ 60
      Memory at b0510000 (64-bit, non-prefetchable) [size=16K]
      Capabilities: [50] Power Management version 2
      Capabilities: [60] MSI: Enable+ Count=1/1 Maskable- 64bit-
      Capabilities: [70] Express Root Complex Integrated Endpoint, MSI 00
      Kernel driver in use: snd_hda_intel
    "
  />

  <p>
    If you find the output of <code>lspci -v</code> overly extensive, you can
    use the <code>-s</code> flag to focus on a specific device through its
    domain and BDF numbers. For instance, to view details solely for the SATA
    controller mentioned earlier, I executed the following:
  </p>

  <CodeBlock code="lspci -v -s 00:1f.2" />

  <p>
    Note that the domain number was omitted in the command above because it's
    not necessary to uniquely identify a PCI device. This is what the output
    looks like on my laptop:
  </p>

  <CodeBlock
    code="
    00:1f.2 SATA controller: Intel Corporation Lynx Point-LP SATA Controller 1 [AHCI mode] (rev 04) (prog-if 01 [AHCI 1.0])
      Subsystem: Lenovo Device 3978
      Flags: bus master, 66MHz, medium devsel, latency 0, IRQ 57
      I/O ports at 4088 [size=8]
      I/O ports at 4094 [size=4]
      I/O ports at 4080 [size=8]
      I/O ports at 4090 [size=4]
      I/O ports at 4060 [size=32]
      Memory at b051b000 (32-bit, non-prefetchable) [size=2K]
      Capabilities: [80] MSI: Enable+ Count=1/1 Maskable- 64bit-
      Capabilities: [70] Power Management version 3
      Capabilities: [a8] SATA HBA v1.0
      Kernel driver in use: ahci
    "
  />

  <p>
    Lastly, if you're interested in obtaining a machine-readable output, you can
    use the <code>-mm</code> flag with <code>lspci</code>. You can learn more in
    the
    <a href="http://linux.die.net/man/8/lspci"><code>lspci</code></a>
    documentation. When paired with the <code>-v</code> flag, the output is also
    quite human-friendly:
  </p>

  <CodeBlock code="lspci -vmm" />

  <p>
    The output is straightforward to interpret. Here is how it appears for the
    first three devices on my laptop:
  </p>

  <CodeBlock
    code="
    Slot:  00:00.0
    Class:  Host bridge
    Vendor:  Intel Corporation
    Device:  Haswell-ULT DRAM Controller
    SVendor:  Lenovo
    SDevice:  Device 3978
    Rev:  0b

    Slot:  00:02.0
    Class:  VGA compatible controller
    Vendor:  Intel Corporation
    Device:  Haswell-ULT Integrated Graphics Controller
    SVendor:  Lenovo
    SDevice:  Device 3978
    Rev:  0b

    Slot:  00:03.0
    Class:  Audio device
    Vendor:  Intel Corporation
    Device:  Haswell-ULT HD Audio Controller
    SVendor:  Lenovo
    SDevice:  Device 3978
    Rev:  0b
    "
  />

  <p>
    The SVendor and SDevice values correspond to the "subsystem vendor ID"
    (SVID) and "subsystem ID" (SSID) registers within the configuration space,
    respectively. While the vendor ID identifies the chipset manufacturer, the
    subsystem vendor ID indicates the card manufacturer. Interestingly, the
    subsystem ID, which is allocated by the subsystem vendor, originates from
    the same number space as the device ID. By using the <code>-nn</code> flag,
    these numerical values are presented alongside their SVendor and SDevice
    counterparts.
  </p>

  <SectionTitle>Appendix: PCI configuration space</SectionTitle>

  <p>
    Using <code>lspci</code>, you can display the configuration space of each
    PCI device in hexadecimal format. This can be done by running
    <code>lspci</code> with <code>-x</code>, <code>-xx</code>, or
    <code>-xxx</code>. More <code>x</code>'s indicate a more comprehensive
    display of the configuration space. To clearly identify locations of the
    device ID, vendor ID, and class codes, it's advisable to pair this with the
    <code>-nn</code> flag:
  </p>

  <CodeBlock code="lspci -xnn" />

  <p>
    The output below highlights the relevant areas in sequence: vendor ID,
    device ID, and class code. It's important to be aware that these values have
    their bytes "inverted" due to Intel processors employing
    <a href="https://en.wikipedia.org/wiki/Endianness">little-endian</a> format.
    As before, for conciseness, only the first three devices are shown:
  </p>

  <CodeBlock
    code="
    00:00.0 Host bridge [0600]: Intel Corporation Haswell-ULT DRAM Controller [8086:0a04] (rev 0b)
    00: **86 80 04 0a** 06 00 90 20 0b 00 **00 06** 00 00 00 00
    10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
    20: 00 00 00 00 00 00 00 00 00 00 00 00 aa 17 78 39
    30: 00 00 00 00 e0 00 00 00 00 00 00 00 00 00 00 00

    00:02.0 VGA compatible controller [0300]: Intel Corporation Haswell-ULT Integrated Graphics Controller [8086:0a16] (rev 0b)
    00: **86 80 16 0a** 07 04 90 00 0b 00 **00 03** 00 00 00 00
    10: 04 00 00 b0 00 00 00 00 0c 00 00 a0 00 00 00 00
    20: 01 40 00 00 00 00 00 00 00 00 00 00 aa 17 78 39
    30: 00 00 00 00 90 00 00 00 00 00 00 00 00 01 00 00

    00:03.0 Audio device [0403]: Intel Corporation Haswell-ULT HD Audio Controller [8086:0a0c] (rev 0b)
    00: **86 80 0c 0a** 06 04 10 00 0b 00 **03 04** 10 00 00 00
    10: 04 00 51 b0 00 00 00 00 00 00 00 00 00 00 00 00
    20: 00 00 00 00 00 00 00 00 00 00 00 00 aa 17 78 39
    30: 00 00 00 00 50 00 00 00 00 00 00 00 00 01 00 00
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
