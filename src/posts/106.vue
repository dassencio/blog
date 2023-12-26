<template>
  <p>
    Let $X$ be an $M \times N$ matrix (a two-dimensional array) of complex
    numbers $x_{mn}$ for $m = 0, 1, \ldots, M - 1$ and $n = 0, 1, \ldots, N -
    1$. The
    <a href="https://en.wikipedia.org/wiki/Discrete_Fourier_transform"
      >discrete Fourier transform</a
    >
    of $X$ is another $M \times N$ matrix $\tilde{X}$ of complex numbers
    $\tilde{x}_{pq}$ such that:
  </p>

  <EquationBlock label="dft-2d">
    \tilde{x}_{pq} = \sum_{m = 0}^{M - 1} \sum_{n = 0}^{N - 1} x_{mn} e^{-i 2\pi
    pm/M} e^{-i 2\pi qn/N}
  </EquationBlock>

  <p>
    for $p = 0, 1, \ldots, M - 1$ and $q = 0, 1, \ldots, N - 1$. The original
    matrix $X$ can be recovered from $\tilde{X}$ through its inverse discrete
    Fourier transform:
  </p>

  <EquationBlock>
    x_{mn} = \frac{1}{MN} \sum_{p = 0}^{M - 1} \sum_{q = 0}^{N - 1}
    \tilde{x}_{pq} e^{i 2\pi pm/M} e^{i 2\pi qn/N}
  </EquationBlock>

  <p>
    Since a
    <a href="https://en.wikipedia.org/wiki/Grayscale">grayscale image</a>
    can be represented as a matrix whose elements are 8-bit integers
    representing pixel values ranging from $0$ (black) to $255$ (white), we can
    compute its DFT using equation \eqref{dft-2d}. Interestingly, the magnitude
    of the DFT of such an image does not contain much information, but its phase
    does. To clarify this statement, let's define two $M \times N$ matrices,
    $\tilde{X}_{\textrm{mag}}$ and $\tilde{X}_{\textrm{phase}}$, whose elements
    are given by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock multiple>
    (\tilde{X}_{\textrm{mag}})_{pq}
      &= \left|\tilde{x}_{pq}\right| \label{M} \\
    (\tilde{X}_{\textrm{phase}})_{pq}
      &= \tilde{x}_{pq} / \left|\tilde{x}_{pq}\right| \label{P}
  </EquationBlock>

  <p>
    Being a complex number, $\tilde{x}_{pq} = \rho_{pq} e^{i\phi_{pq}}$, where
    $\rho_{pq}$ is its magnitude, and $\phi_{pq}$ is its phase. From equations
    \eqref{M} and \eqref{P}, we have $(\tilde{X}_{\textrm{mag}})_{pq} =
    \rho_{pq}$, and $(\tilde{X}_{\textrm{phase}})_{pq} = e^{i\phi_{pq}}$, so the
    matrices $\tilde{X}_{\textrm{mag}}$ and $\tilde{X}_{\textrm{phase}}$ contain
    only the magnitude and phase information of the elements of $\tilde{X}$,
    respectively.
  </p>

  <p>
    If we compute the inverse DFTs of $\tilde{X}_{\textrm{mag}}$ and
    $\tilde{X}_{\textrm{phase}}$, what type of images will we recover? Our
    original image had only real values, but these inverse DFTs will, in
    general, not, so we will consider only their real components. Additionally,
    the pixel values of the resulting images will not necessarily fall within
    the closed interval $[0, 255]$, but we can clip the negative values (set
    them to zero) and rescale the nonnegative values to have them fall within
    this interval. An example of what the resulting images look like is shown in
    <FigureLink id="idft" /> (all figures in this post were generated using the
    script available <a href="https://github.com/dassencio/image-dft">here</a>).
  </p>

  <FigureBlock
    id="idft"
    caption="An original image (left) and the images produced by computing the
             inverse DFTs of the magnitude (center) and phase (right) components
             of the original image's DFT."
  >
    <ResponsiveImage
      alt="Inverse DFTs"
      :src="ImageIdftsSmall"
      :link="ImageIdftsBig"
    />
  </FigureBlock>

  <p>
    From <FigureLink id="idft" />, we can see that the inverse DFT
    $\tilde{X}_{\textrm{mag}}$ of the magnitude matrix produces a nearly black
    image. However, the inverse DFT $\tilde{X}_{\textrm{phase}}$ of the phase
    matrix shows well-defined contours from the original image (if you cannot
    see them, try increasing the brightness of your screen or click on the
    figure to see a larger version of it). This indicates that the phase
    component of the image's DFT carries more information than the magnitude
    component. To better illustrate this fact, we can apply
    <a href="https://en.wikipedia.org/wiki/Histogram_equalization"
      >histogram equalization</a
    >
    to the images produced from the inverse DFTs. The results, shown in
    <FigureLink id="idft-corrected" />, serve as further confirmation of our
    hypothesis.
  </p>

  <FigureBlock
    id="idft-corrected"
    caption="An original image (left) and the images produced (after histogram
             equalization) by computing the inverse DFTs of the magnitude
             (center) and phase (right) components of the original image's DFT."
  >
    <ResponsiveImage
      alt="Inverse DFTs (corrected)"
      :src="ImageIdftsCorrectedSmall"
      :link="ImageIdftsCorrectedBig"
    />
  </FigureBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import ImageIdftsBig from "@/assets/images/image-idfts-big.jpg";
import ImageIdftsCorrectedBig from "@/assets/images/image-idfts-corrected-big.jpg";
import ImageIdftsCorrectedSmall from "@/assets/images/image-idfts-corrected-small.jpg";
import ImageIdftsSmall from "@/assets/images/image-idfts-small.jpg";

onMounted(() => onViewMounted());
</script>
