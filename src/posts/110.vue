<template>
  <p>
    If you use <a href="https://firejail.wordpress.com/">Firejail</a> to run
    <a href="https://github.com/signalapp/Signal-Desktop">Signal Desktop</a>
    in a sandboxed environment on Linux, you will likely be surprised by the
    fact that a new application instance is opened every time you execute the
    <code>firejail signal-desktop</code> command. Attempting to open a second
    instance of Signal Desktop should simply activate the existing one, but
    Firejail disrupts this default behavior.
  </p>

  <p>
    Moreover, if you use the
    <code>--use-tray-icon</code> parameter to have Signal Desktop place an icon
    in your desktop environment's icon tray, the icon may not only display
    incorrectly but each newly opened instance will also add an additional
    (incorrect) icon there, exacerbating the issue.
  </p>

  <p>
    Fortunately, addressing these issues is straightforward. All you need to do
    is create a Firejail profile file named
    <code>signal-desktop.profile</code> inside the
    <code>~/.config/firejail/</code> directory containing the following:
  </p>

  <CodeBlock
    code="
    ignore private-tmp
    include /etc/firejail/signal-desktop.profile
    "
  />

  <p>
    Whenever you run Signal Desktop with Firejail, this profile will be
    automatically loaded to define the sandboxed environment in which the
    application will be executed.
  </p>

  <p>
    The second line of the file instructs Firejail to load its default profile
    for the Signal Desktop application. This is necessary because Firejail does
    not automatically do so whenever it detects a user-provided profile file
    (which is our case). Therefore, to load the default security settings for
    Signal Desktop, we need to explicitly include them in our profile.
  </p>

  <p>
    Within Firejail's default profile for Signal Desktop, there is a directive
    (<code>private-tmp</code>) that instructs Firejail to present an empty
    temporary filesystem over the
    <code>/tmp</code> directory to the application. Within this temporary
    filesystem, all files stored in the system's <code>/tmp</code> directory are
    not present, except perhaps for X11 and PulseAudio sockets that need to be
    whitelisted for Signal Desktop to run properly. This increases the system's
    security by preventing a running instance of Signal Desktop from accessing
    files that other processes store in <code>/tmp</code>. However, since Signal
    Desktop itself stores data in that location to indicate that an instance is
    currently running, its ability to prevent multiple concurrent instances is
    lost as a side effect of this security setting. The
    <code>ignore private-tmp</code> directive tells Firejail to present the
    system's actual <code>/tmp</code> directory to Signal Desktop instead of a
    temporary filesystem mounted over it, thereby addressing the problem (but at
    the cost of a lower system security level, of course). As a bonus, the tray
    icon issues are resolved as well.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
