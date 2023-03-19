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
    The Raspberry Pi website claims that the Model B uses
    <a
      href="https://web.archive.org/web/20140330040115/http://www.raspberrypi.org/faqs#powerReqs"
    >
      between 700-1000mA</a
    >
    (depending on the connected peripherals) and needs 5V to operate. My current
    measurements were however significantly lower than the claimed values, even
    when the Raspberry Pi was under heavy load (e.g. during boot time).
  </p>

  <FigureBlock
    id="raspberry-pi-measurements"
    caption="Measured current (a) and voltage (b) used by a Raspberry Pi Model
             B. The values shown are $I = 0.36\textrm{A}$ and
             $V = 4.96\textrm{V}$ respectively."
  >
    <BaseSubfigure>
      <ResponsiveImage alt="Current" :src="raspberryPiCurrent" />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage alt="Voltage" :src="raspberryPiVoltage" />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    With measured values for the current $I$ and the voltage $V$, one can
    compute the power consumption $P$ of a device using the following formula:
  </p>

  <EquationBlock> P = VI </EquationBlock>

  <p>
    Using the values from the Raspberry Pi website ($V = 5\textrm{V}$ and $I =
    700\textrm{mA} = 0.7\textrm{A}$), we get:
  </p>

  <EquationBlock>
    P = 5\textrm{V} \cdot 0.7\textrm{A} = 3.5\textrm{W}
  </EquationBlock>

  <p>
    The highest current and voltage values I observed were $I_{\max} =
    0.43\textrm{A}$ and $V_{\max} = 4.96\textrm{V}$ respectively, meaning the
    maximum amount of power consumed by my Raspberry Pi was:
  </p>

  <EquationBlock>
    P_{\max} = V_{\max} I_{\max} \approx 2.13\textrm{W}
  </EquationBlock>

  <p>
    which is significantly lower than $3.5\textrm{W}$. Under normal load, my
    Raspberry Pi consumed between $1.8\textrm{W}$ and $2.0\textrm{W}$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import raspberryPiCurrent from "@/assets/images/raspberry-pi-current.jpg";
import raspberryPiVoltage from "@/assets/images/raspberry-pi-voltage.jpg";

onMounted(() => onViewMounted());
</script>
