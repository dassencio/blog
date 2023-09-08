<template>
  <p>
    This post demonstrates how to verify whether a given
    <a href="https://en.wikipedia.org/wiki/IPv4">IPv4</a>/<a
      href="https://en.wikipedia.org/wiki/IPv6"
      >IPv6</a
    >
    address belongs to a specific
    <a href="https://en.wikipedia.org/wiki/Subnetwork">subnetwork</a>
    represented in
    <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing"
      >CIDR</a
    >
    notation. The solution presented here is compatible with both Python 2.x and
    3.x. However, Python 3.x users can also utilize the
    <a href="https://pypi.python.org/pypi/netaddr"><code>netaddr</code></a>
    module for the same purpose, as described
    <a href="http://stackoverflow.com/a/820124">here</a>.
  </p>

  <p>
    The central idea presented here is simple: IP addresses are essentially
    integers. Specifically, IPv4 addresses are represented by 32-bit integers,
    while IPv6 addresses use 128-bit integers. Given that a subnetwork spans a
    consecutive range of IP addresses, we can identify its range by pinpointing
    the integer values of its start and end addresses. A specified IP address is
    part of the subnetwork if and only if its integer representation lies within
    this range.
  </p>

  <p>
    The function <code>ip_in_subnetwork</code> in the code below implements the
    technique just described. A detailed explanation of the more intricate parts
    of the code is provided below.
  </p>

  <CodeBlock language="python" :code="pythonCode" />

  <p>
    A few clarifications might be needed to fully understand the code, assuming
    you're familiar with CIDR notation. First, within the
    <code>subnetwork_to_ip_range</code> function, we compute a "suffix mask".
    This mask consists of bits set to one if they are in the host part of an IP
    address, and zero if they belong to the network prefix. Essentially, this
    mask is the inversion of the netmask for the provided subnetwork. Since the
    smallest IP address in a particular subnetwork has all its host bits set to
    zero, this address matches the network prefix. Adding the network prefix to
    the suffix mask yields the highest IP address in the subnetwork.
  </p>

  <p>
    In both the <code>ip_to_integer</code> and
    <code>subnetwork_to_ip_range</code> functions, we utilize the
    <a href="https://docs.python.org/2/library/socket.html#socket.inet_pton"
      ><code>socket.inet_pton</code></a
    >
    method to transform an IP address into its binary string representation (a
    32-bit/4-byte string for IPv4 and a 128-bit/16-byte string for IPv6). For
    instance, the IP address "<code>192.168.1.0</code>" gets converted to
    "<code>\xc0\xa8\x01\x00</code>". Here, the bytes correspond to the numbers
    <code>192</code> (<code>0xc0</code>), <code>168</code> (<code>0xa8</code>),
    <code>1</code> (<code>0x01</code>), and <code>0</code> (<code>0x00</code>)
    in hexadecimal notation. Subsequently, this binary string (denoted as
    <code>ip_hex</code>) undergoes conversion to an actual hexadecimal string
    using
    <a href="https://docs.python.org/2/library/binascii.html#binascii.hexlify"
      ><code>binascii.hexlify</code></a
    >. For instance, "<code>\xc0\xa8\x01\x00</code>" is transformed into the
    ASCII string "<code>c0a80100</code>". It's worth noting that the resulting
    string is twice the length of the original; this is because each byte in the
    original string requires two characters for hexadecimal representation. This
    string is then fed into the
    <a href="https://docs.python.org/2/library/functions.html#int"
      ><code>int</code></a
    >
    constructor for conversion into an integer. The second parameter
    (<code>16</code>) provided to <code>int</code> signifies that the input
    string represents a hexadecimal value.
  </p>

  <p>
    Lastly, it's important to note that both <code>ip_to_integer</code> and
    <code>subnetwork_to_ip_range</code> attempt to process their input
    parameters initially as IPv4 addresses/subnetworks and subsequently as IPv6.
    An exception is raised only if both attempts are unsuccessful. Such an
    exception implies that the provided input does not correspond to a valid IP
    address or subnetwork.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const pythonCode = `
import socket
import binascii

def ip_in_subnetwork(ip_address, subnetwork):
  """
  Returns True if the provided IP address belongs to the
  subnetwork (specified in CIDR notation); otherwise, returns
  False. Both arguments should be strings.

  Supports both IPv4 (e.g., "192.168.1.1" and "192.168.1.0/24")
  and IPv6 (e.g., "2a02:a448:ddb0::" and "2a02:a448:ddb0::/44")
  addresses and subnetworks.
  """

  (ip_integer, version_1) = ip_to_integer(ip_address)
  (ip_lower, ip_upper, version_2) = subnetwork_to_ip_range(subnetwork)

  if version_1 != version_2:
    raise ValueError("Incompatible IP versions")

  return (ip_lower <= ip_integer <= ip_upper)

def ip_to_integer(ip_address):
  """
  Converts a string-represented IP address to its integer
  representation.

  Returns a tuple (ip_integer, version), where version
  indicates the IP version (either 4 or 6).

  Supports both IPv4 (e.g., "192.168.1.1") and IPv6 (e.g.,
  "2a02:a448:ddb0::") addresses.
  """

  # Try parsing the IP address first as IPv4, then as IPv6.
  for version in (socket.AF_INET, socket.AF_INET6):
    try:
      ip_hex = socket.inet_pton(version, ip_address)
      ip_integer = int(binascii.hexlify(ip_hex), 16)
      return (ip_integer, 4 if version == socket.AF_INET else 6)
    except:
      pass

  raise ValueError("invalid IP address")

def subnetwork_to_ip_range(subnetwork):
  """
  Converts a CIDR notation subnetwork string to its integer
  bounds.

  Returns a tuple (ip_lower, ip_upper, version), where:
  - ip_lower and ip_upper are integer values of the lower and
    upper IP addresses, respectively.
  - version indicates the subnetwork IP version (either 4 or 6).

  Accepts both IPv4 (e.g., "192.168.1.0/24") and IPv6 (e.g.,
  "2a02:a448:ddb0::/44") subnetworks.
  """

  try:
    fragments = subnetwork.split('/')
    network_prefix = fragments[0]
    netmask_len = int(fragments[1])

    # Try parsing the subnetwork first as IPv4, then as IPv6.
    for version in (socket.AF_INET, socket.AF_INET6):
      ip_len = 32 if version == socket.AF_INET else 128

      try:
        suffix_mask = (1 << (ip_len - netmask_len)) - 1
        netmask = ((1 << ip_len) - 1) - suffix_mask
        ip_hex = socket.inet_pton(version, network_prefix)
        ip_lower = int(binascii.hexlify(ip_hex), 16) & netmask
        ip_upper = ip_lower + suffix_mask
        return (ip_lower,
                ip_upper,
                4 if version == socket.AF_INET else 6)
      except:
        pass
  except:
    pass

  raise ValueError("Invalid subnetwork")
`;
</script>
