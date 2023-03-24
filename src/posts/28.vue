<template>
  <p>
    I recently purchased a USB device which can measure current and voltage
    (i.e., it functions both as a voltmeter as well as an ammeter) and decided
    to use it to determine how much power my Raspberry Pi Model B typically
    consumes.
    <FigureLink id="raspberry-pi-measurements" capitalized /> shows what it
    looks like.
  </p>

  <p>
    The
    <a
      href="https://web.archive.org/web/20140330040115/http://www.raspberrypi.org/faqs#powerReqs"
      >Raspberry Pi website</a
    >
    claims that the Model B needs $5\Volt$ to operate and draws a current
    between $700\Milliampere$ and $1000\Milliampere$ (depending on the connected
    peripherals). My voltage measurements were always very close to $5V$, but my
    current measurements fell below the advertised range even when the Raspberry
    Pi was under heavy load (e.g. during boot time).
  </p>

  <FigureBlock
    id="raspberry-pi-measurements"
    caption="Measured current (a) and voltage (b) used by a Raspberry Pi Model
             B. The values shown are $I = 0.36\Ampere$ and
             $V = 4.96\Volt$ respectively."
  >
    <BaseSubfigure>
      <ResponsiveImage
        alt="Current"
        :link="rpiCurrentLarge"
        :src="rpiCurrentSmall"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Voltage"
        :link="rpiVoltageLarge"
        :src="rpiVoltageSmall"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    With measured values for the current $I$ and the voltage $V$, one can
    compute the power consumption $P$ of a device using the following formula:
  </p>

  <EquationBlock> P = VI </EquationBlock>

  <p>
    Using the values from the Raspberry Pi website ($V = 5\Volt$ and $I =
    700\Milliampere = 0.7\Ampere$), we get:
  </p>

  <EquationBlock> P = 5\Volt \cdot 0.7\Ampere = 3.5\Watt </EquationBlock>

  <p>
    The highest current and voltage values I observed were $I_{\max} =
    0.43\Ampere$ and $V_{\max} = 4.96\Volt$ respectively, meaning the maximum
    amount of power consumed by my Raspberry Pi was:
  </p>

  <EquationBlock>
    P_{\max} = V_{\max} I_{\max} \approx 2.13\Watt
  </EquationBlock>

  <p>
    which is significantly lower than $3.5\Watt$. Under normal load, my
    Raspberry Pi consumed between $1.8\Watt$ and $2.0\Watt$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import rpiCurrentLarge from "@/assets/images/rpi-model-B-current-large.jpg";
import rpiCurrentSmall from "@/assets/images/rpi-model-B-current-small.jpg";
import rpiVoltageLarge from "@/assets/images/rpi-model-B-voltage-large.jpg";
import rpiVoltageSmall from "@/assets/images/rpi-model-B-voltage-small.jpg";

onMounted(() => onViewMounted());
</script>
