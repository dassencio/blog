<template>
  <p>
    I once wrote about how one can create a
    <RouterLink :to="{ name: '14' }">configuration file</RouterLink> for
    specifying the
    <a href="https://en.wikipedia.org/wiki/Secure_Shell">SSH</a> connection
    parameters (hostname, port, MACs, ciphers, key exchange algorithms, etc.)
    for different servers through aliases. Connecting via SSH in this manner is
    much more efficient as there is much less typing involved.
  </p>

  <p>
    However, there are situations where you might not want to add all settings
    for a given server to your SSH configuration file. A typical case is when
    you know you will connect to the server only once, but have chosen a set of
    default cryptographic algorithms which the target server does not support.
    In this case, you might encounter errors like these:
  </p>

  <CodeBlock
    code="no matching mac found: client hmac-sha2-512 server hmac-sha1,hmac-md5"
  />

  <CodeBlock
    code="no matching cipher found: client aes256-ctr server aes128-cbc,blowfish-cbc"
  />

  <CodeBlock code="Unable to negotiate a key exchange method" />

  <CodeBlock code="no hostkey alg" />

  <p>
    Each of the errors above indicates that the server does not support any
    combination of the necessary cryptographic algorithms (ciphers, MACs, etc.)
    that you allow the SSH client to to use. This situation might often arise
    when you try to connect to servers that are not actively maintained.
  </p>

  <p>
    Luckily, the solution is straightforward: simply choose the cryptographic
    algorithms manually to connect using methods that the server supports.
    Although the example below specifies multiple parameters, you only need to
    specify those related to the error message you received:
  </p>

  <CodeBlock
    code="
    ssh myusername@mydomain.com -m hmac-sha1 \
                                -c aes128-cbc \
                                -o KexAlgorithms=diffie-hellman-group1-sha1 \
                                -o HostKeyAlgorithms=ssh-rsa
    "
  />

  <p>
    Here is a list of the main security parameters that can be specified. You
    can specify several possible algorithms for a given parameter by separating
    them with commas, e.g., <code>-c aes128-cbc,aes128-ctr</code>:
  </p>

  <MapBlock>
    <code>-m &lt;MACs&gt;</code>
    <span>specifies the allowed MAC(s)</span>

    <code>-c &lt;ciphers&gt;</code>
    <span>specifies the allowed cipher(s)</span>

    <code>-o KexAlgorithms=&lt;methods&gt;</code>
    <span>specifies the allowed key exchange algorithm(s)</span>

    <code>-o HostKeyAlgorithms=&lt;algorithms&gt;</code>
    <span>specifies the allowed authentication algorithm(s)</span>
  </MapBlock>

  <p>
    To visualize the parameter negotiation, run the command above with the
    <code>-vv</code> option. Look for a set of messages similar to the ones
    shown below:
  </p>

  <CodeBlock
    code="
    debug2: kex_parse_kexinit: diffie-hellman-group1-sha1
    debug2: kex_parse_kexinit: ssh-rsa
    debug2: kex_parse_kexinit: aes128-cbc
    debug2: kex_parse_kexinit: aes128-cbc
    debug2: kex_parse_kexinit: hmac-sha1
    debug2: kex_parse_kexinit: hmac-sha1
    debug2: kex_parse_kexinit: none,zlib@openssh.com,zlib
    debug2: kex_parse_kexinit: none,zlib@openssh.com,zlib
    ...
    debug2: kex_parse_kexinit: first_kex_follows 0
    debug2: kex_parse_kexinit: reserved 0
    debug2: kex_parse_kexinit: diffie-hellman-group1-sha1
    debug2: kex_parse_kexinit: ssh-rsa,ssh-dss
    debug2: kex_parse_kexinit: aes128-cbc,blowfish-cbc,3des-cbc
    debug2: kex_parse_kexinit: aes128-cbc,blowfish-cbc,3des-cbc
    debug2: kex_parse_kexinit: hmac-sha1,hmac-md5
    debug2: kex_parse_kexinit: hmac-sha1,hmac-md5
    debug2: kex_parse_kexinit: none,zlib
    debug2: kex_parse_kexinit: none,zlib
    "
  />

  <p>
    The first set of lines shows the algorithms you allow, while the second
    shows the algorithms supported by the server. If you don't choose a set of
    algorithms that the server fully supports, you will get an error similar to
    the ones shown above. When in trouble, use the
    <code>-vv</code> option to figure out what the server actually supports.
    However, keep in mind that the less secure the algorithms you use, the less
    secure your connection will be!
  </p>

  <p>
    You can find a list of ciphers, MACs, key exchange, and authentication
    algorithms supported by your SSH installation in the
    <code>ssh_config</code> manual:
  </p>

  <CodeBlock code="man ssh_config" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
