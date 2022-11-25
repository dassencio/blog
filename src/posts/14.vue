<template>
  <p>
    Connecting via
    <a href="https://en.wikipedia.org/wiki/Secure_Shell">SSH</a> can become
    quite annoying if you do it often by typing commands such as:
  </p>

  <CodeBlock code="ssh myusername@mydomain.com" />

  <p>
    It's even more annoying if the server does not listen for incoming SSH
    connections on the default port (22), forcing you to specify the port number
    every time you connect to it. For a server listening on port 10022, your
    command may look like this:
  </p>

  <CodeBlock code="ssh -p 10022 myusername@mydomain.com" />

  <p>
    While you could in principle create a
    <a href="https://en.wikipedia.org/wiki/Alias_%28command%29">shell alias</a>
    to avoid having to always type long ssh commands, there is a much more
    elegant solution to this problem: use an ssh config file to define the SSH
    connection details for the server. To set one up, first create a file named
    <code>config</code> in the <code>~/.ssh</code> directory (if this directory
    does not exist, you will need to create it). Then, specify the connection
    parameters for the server in the following format:
  </p>

  <CodeBlock
    code="
    Host myserver
      Hostname mydomain.com
      User myusername
      Port 10022
    "
  />

  <p>
    For a server which listens on the default SSH port (22), the
    <code>Port</code> directive can be omitted. With the configuration above,
    it's possible to connect to the server with a much shorter command:
  </p>

  <CodeBlock code="ssh myserver" />

  <p>
    Much better than writing the long ssh command above, right? Also, depending
    on the operating system and shell you're using, the chosen server name
    (<code>myserver</code>) may be autocompleted if you type part of it and
    press the "Tab" key.
  </p>

  <SectionTitle>Bonus: security options</SectionTitle>

  <p>
    You can do many other things with an ssh config file. For instance, you can
    select a private key which you would like to use with a certain server. You
    can even force ssh to use a specific set of
    <a href="https://en.wikipedia.org/wiki/Message_authentication_code">MACs</a
    >,
    <a href="https://en.wikipedia.org/wiki/Key_exchange"
      >key exchange algorithms</a
    >, <a href="https://en.wikipedia.org/wiki/Block_cipher">ciphers</a> and
    <a href="https://en.wikipedia.org/wiki/Public-key_cryptography"
      >authentication algorithms</a
    >
    for each server. Here is an example:
  </p>

  <CodeBlock
    code="
    Host myserver
      Hostname mydomain.com
      User myusername
      Port 10022
      Protocol 2
      HostKeyAlgorithms ssh-rsa
      Ciphers aes256-ctr, aes256-cbc
      MACs hmac-sha2-512, hmac-sha2-256
      KexAlgorithms diffie-hellman-group-exchange-sha256
      IdentityFile ~/.ssh/id_rsa
    "
  />

  <p>
    When you attempt to connect to <code>myserver</code>, the connection will
    only be established if the server supports the chosen:
  </p>

  <MapBlock>
    <b>SSH protocol version:</b>
    <span>
      2 (always use this one; version 1 is
      <a href="https://en.wikipedia.org/wiki/Secure_Shell#Vulnerabilities"
        >vulnerable</a
      >).
    </span>

    <b>Authentication algorithm:</b>
    <span>
      <a href="https://en.wikipedia.org/wiki/RSA_%28algorithm%29">RSA.</a>
    </span>

    <b>Cipher:</b>
    <span>
      <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
        >AES</a
      >
      with either
      <a
        href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_.28CTR.29"
        >counter</a
      >
      or
      <a
        href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher-block_chaining_.28CBC.29"
        >cipher-block chaining</a
      >
      as mode of operation and 256-bit long keys.
    </span>

    <b>MAC:</b>
    <span>
      <a
        href="https://en.wikipedia.org/wiki/Hash-based_message_authentication_code"
        >HMAC</a
      >
      based on a
      <a href="https://en.wikipedia.org/wiki/SHA-2">SHA-2</a> hash function
      producing either 512- or 256-bit long digests.
    </span>

    <b>Key exchange algorithm:</b>
    <span>
      <a
        href="https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange"
        >Diffie-Hellman</a
      >
      with flexible group size using SHA-2 with 256-bit long digests.
    </span>
  </MapBlock>

  <p>
    Also, the file <code>~/.ssh/id_rsa</code> will be used as your private RSA
    key. Whenever multiple choices are specified for a certain parameter (e.g.
    <code>Ciphers</code> is given a list containing both
    <code>aes256-ctr</code> and <code>aes256-cbc</code>), ssh will always use
    the first one in the list which is supported by the server.
  </p>

  <p>
    Readers familiar with cryptography will realize this gives the user a lot of
    control over the security of their connections. To get a complete list of
    supported ciphers, MACs, key exchange algorithms and authentication
    algorithms, see the manual for <code>ssh_config</code>:
  </p>

  <CodeBlock code="man ssh_config" />

  <p>
    In order to simplify your ssh config file, you can define default
    configuration parameters for every host with the <code>*</code> symbol as
    shown below:
  </p>

  <CodeBlock
    code="
    Host *
      Protocol 2
      HostKeyAlgorithms ssh-rsa
      Ciphers aes256-ctr, aes256-cbc
      MACs hmac-sha2-512, hmac-sha2-256
      KexAlgorithms diffie-hellman-group-exchange-sha256
      IdentityFile ~/.ssh/id_rsa
    "
  />

  <p>
    This will cause all your SSH connections to any server to use those
    parameters unless they have already been specified earlier in the config
    file. To emphasize this: when the config file is read, only the first
    definition of a parameter for a certain server will be used. Consider the
    example below:
  </p>

  <CodeBlock
    code="
    Host myserver
      Hostname mydomain.com
      User myusername
      Port 10022
      Ciphers aes128-cbc
      MACs hmac-sha1
      KexAlgorithms diffie-hellman-group1-sha1

    Host myotherserver
      Hostname anotherdomain.com
      User myusername

    Host *
      Protocol 2
      HostKeyAlgorithms ssh-rsa
      Ciphers aes256-ctr
      MACs hmac-sha2-512
      KexAlgorithms diffie-hellman-group-exchange-sha256
      IdentityFile ~/.ssh/id_rsa
    "
  />

  <p>
    In this case, if you connect to <code>myserver</code>, the parameters
    specified for <code>myserver</code> will take precedence over everything
    appearing later in the config file. In other words, the MAC used will be
    <code>hmac-sha1</code> (HMAC with
    <a href="https://en.wikipedia.org/wiki/SHA-1">SHA-1</a> as hash function)
    instead of <code>hmac-sha2-512</code>. Similarly, the block cipher used will
    be <code>aes128-cbc</code> (AES with CBC as mode of operation and 128-bit
    long keys) instead of <code>aes256-ctr</code>, and so on. On the other hand,
    when you connect to <code>myotherserver</code>, all parameters specified
    under <code>*</code> will be adopted.
  </p>
</template>
