<template>
  <p>
    When observing discussions within the cryptography community, it is common
    to encounter arguments that revolve around the performance of a specific
    cryptographic algorithm. Indeed, a cryptographic algorithm must not only be
    secure, but also efficient across various types of devices to gain
    acceptance from professional cryptographers. As Bruce Schneier
    <a href="https://www.schneier.com/crypto-gram-9810.html#cipherdesign"
      >once stated</a
    >, "<i>Given enough rounds, pretty much anything is secure</i>". However,
    slow algorithms are seldom adopted in practice due to their speed
    limitations.
  </p>

  <p>
    To aid developers in selecting the most appropriate cryptographic algorithms
    for their applications,
    <a href="https://www.openssl.org">OpenSSL</a> provides a performance
    analysis tool. This tool assesses the efficiency of its implemented
    <a href="https://en.wikipedia.org/wiki/Cipher">ciphers</a>,
    <a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function"
      >hash functions</a
    >,
    <a href="https://en.wikipedia.org/wiki/Public-key_cryptography"
      >public key algorithms</a
    >, and
    <a href="https://en.wikipedia.org/wiki/Key_exchange"
      >key exchange algorithms</a
    >. To run this tool and view the performance metrics on your computer, open
    a terminal and execute the following command:
  </p>

  <CodeBlock code="openssl speed" />

  <p>
    The output may be extensive and could take a few minutes to generate. Below
    are the initial lines of output that I received (demonstrating the
    performance of some cryptographic hash functions; observe that different
    input sizes are used for each hash function):
  </p>

  <CodeBlock
    code="
    Doing md4 for 3s on 16 size blocks: 11817261 md4's in 2.99s
    Doing md4 for 3s on 64 size blocks: 9164094 md4's in 2.99s
    Doing md4 for 3s on 256 size blocks: 5436759 md4's in 2.99s
    Doing md4 for 3s on 1024 size blocks: 2053975 md4's in 2.99s
    Doing md4 for 3s on 8192 size blocks: 304846 md4's in 2.98s
    Doing md5 for 3s on 16 size blocks: 8763024 md5's in 3.00s
    Doing md5 for 3s on 64 size blocks: 6537570 md5's in 2.99s
    Doing md5 for 3s on 256 size blocks: 3710551 md5's in 2.99s
    Doing md5 for 3s on 1024 size blocks: 1334743 md5's in 3.00s
    Doing md5 for 3s on 8192 size blocks: 192998 md5's in 2.99s
    Doing hmac(md5) for 3s on 16 size blocks: 7157191 hmac(md5)'s in 3.00s
    Doing hmac(md5) for 3s on 64 size blocks: 5738849 hmac(md5)'s in 2.99s
    Doing hmac(md5) for 3s on 256 size blocks: 3437022 hmac(md5)'s in 2.99s
    Doing hmac(md5) for 3s on 1024 size blocks: 1312290 hmac(md5)'s in 3.00s
    Doing hmac(md5) for 3s on 8192 size blocks: 193418 hmac(md5)'s in 2.99s
    "
  />

  <p>
    As one might expect, the number of iterations that each hash function can
    process a given input in a fixed amount of time decreases as the input size
    increases.
  </p>

  <p>
    Following the hash function measurements, similar data is provided for
    ciphers, public key algorithms, and finally, key exchange algorithms. The
    most convenient way to visualize this data is through the tables that appear
    at the end. For instance, the speeds of the hash function, measured in bytes
    processed per second, are depicted in the example table below. Please note
    that this is a truncated view with only the first few lines shown. Results
    for
    <a href="https://en.wikipedia.org/wiki/MD2_%28cryptography%29">MD2</a> and
    <a href="https://en.wikipedia.org/wiki/MDC-2">MDC-2</a> are omitted as they
    are not enabled on my system:
  </p>

  <CodeBlock
    code="
    The 'numbers' are in 1000s of bytes per second processed.
    type             16 bytes     64 bytes    256 bytes   1024 bytes   8192 bytes
    md2                  0.00         0.00         0.00         0.00         0.00
    mdc2                 0.00         0.00         0.00         0.00         0.00
    md4              63236.18k   196154.52k   465488.40k   703434.92k   838019.61k
    md5              46736.13k   139934.61k   317692.66k   455592.28k   528775.79k
    hmac(md5)        38171.69k   122838.24k   294273.46k   447928.32k   529926.51k
    "
  />

  <p>
    The performance metrics of the public key algorithms, displayed in terms of
    both signatures per second and verifications per second, are presented in
    the subsequent table (once again, only the first few lines are shown here):
  </p>

  <CodeBlock
    code="
                      sign    verify    sign/s verify/s
    rsa  512 bits 0.000100s 0.000007s   9976.6 142275.1
    rsa 1024 bits 0.000350s 0.000020s   2858.7  49126.4
    rsa 2048 bits 0.002291s 0.000072s    436.5  13813.4
    rsa 4096 bits 0.017219s 0.000273s     58.1   3659.7
    "
  />

  <p>
    The performance metrics of the key exchange algorithms, represented in terms
    of operations per second, are displayed at the end of the output (again,
    only the first few lines are shown here):
  </p>

  <CodeBlock
    code="
                                 op      op/s
    160 bit ecdh (secp160r1)  0.0003s   3239.5
    192 bit ecdh (nistp192)   0.0004s   2825.5
    224 bit ecdh (nistp224)   0.0002s   6557.5
    256 bit ecdh (nistp256)   0.0003s   3225.8
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
