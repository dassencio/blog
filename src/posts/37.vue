<template>
  <p>
    I previously wrote about how one can create a
    <RouterLink :to="{ name: '14' }">configuration file</RouterLink> for
    specifying the
    <a href="https://en.wikipedia.org/wiki/Secure_Shell">SSH</a> connection
    parameters (hostname, port, MACs, ciphers, key exchange algorithms, etc.)
    for different servers through aliases. Connecting via SSH in this manner is
    much more efficient as it significantly reduces typing.
  </p>

  <p>
    However, there are situations where you might not want to add all settings
    for a given server to your SSH configuration file, e.g. when you anticipate
    connecting to the server only once. In that case, if your SSH configuration
    file specifies a set of default cryptographic algorithms that the target
    server does not support, you might encounter errors like these:
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
    that you allow your SSH client to use. This situation might for instance
    arise when you try to connect to servers that are not actively maintained.
  </p>

  <p>
    Luckily, the solution is straightforward: simply choose the cryptographic
    algorithms manually to connect using algorithms that the server supports.
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
    Below is a list of the main security parameters that can be specified. You
    can specify several possible algorithms for a given parameter by separating
    them with commas, e.g., <code>-c aes128-cbc,aes128-ctr</code>:
  </p>

  <MapBlock>
    <code>-m &lt;MACs&gt;</code>
    <span>Specifies the allowed MAC(s).</span>

    <code>-c &lt;ciphers&gt;</code>
    <span>Specifies the allowed cipher(s).</span>

    <code>-o KexAlgorithms=&lt;methods&gt;</code>
    <span>Specifies the allowed key exchange algorithm(s).</span>

    <code>-o HostKeyAlgorithms=&lt;algorithms&gt;</code>
    <span>Specifies the allowed authentication algorithm(s).</span>
  </MapBlock>

  <p>
    To visualize the client-to-server connection parameter negotiation, run the
    command above with the
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
    The first set of lines in the debug message indicates the algorithms that
    your client is permitted to use, while the second set reveals the algorithms
    supported by the server. If the server doesn't support any possible
    combination of algorithms in your chosen set, you will encounter an error
    similar to those mentioned above. In such scenarios, the
    <code>-vv</code> option can be a valuable tool to determine what the server
    actually supports. However, keep in mind that choosing less secure
    algorithms can compromise the security of your connection!
  </p>

  <p>
    To see a list of ciphers, MACs, key exchange, and authentication algorithms
    supported by your SSH installation, refer to the
    <code>ssh_config</code> manual:
  </p>

  <CodeBlock code="man ssh_config" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
