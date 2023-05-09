<template>
  <p>
    In a <RouterLink :to="{ name: '30' }">previous post</RouterLink>, I
    described how matrices can be compressed by using a tool in linear algebra
    called
    <a href="https://en.wikipedia.org/wiki/Singular_value_decomposition">
      singular value decomposition</a
    >
    (SVD). The trick is to discard information (singular values) from the
    original matrix to generate an "approximate" version of it. This post
    investigates whether that technique can also be used to compress images. The
    idea is to discard information (singular values) from the original matrix to
    generate an approximate version of it. It should be noted that the method
    shown here is for educational purposes only and is not suitable for
    professional image compression.
  </p>

  <p>
    I will use <a href="https://www.gnu.org/software/octave/">Octave</a> to
    illustrate the method. If you're using Ubuntu/Debian, you can install it by
    opening a terminal and running the following command (notice that the
    <code>octave-image</code> package must also be installed):
  </p>

  <CodeBlock code="sudo apt-get install octave octave-image" />

  <p>
    Now start Octave. Images can be read in Octave with the
    <code>imread</code> function:
  </p>

  <CodeBlock language="matlab" code='I = imread("dog-color.png");' />

  <FigureBlock
    id="dog-color"
    caption="A sample image with $400 \times 400$ pixels."
  >
    <ResponsiveImage alt="Dog" :src="dogColor" />
  </FigureBlock>

  <p>
    The command above will read the file <code>dog-color.png</code> (shown in
    <FigureLink id="dog-color" />) and store it as a three-dimensional array
    $I$. The value $I_{ijn}$ is a one-byte integer (i.e., a value in the integer
    range $[0, 255]$) representing the amount of color $n$ on pixel $(i, j)$,
    where $n = 1, 2, 3$ for the colors red, green, and blue respectively, and
    $(i, j)$ represents the position of a pixel in the image, with $i$ and $j$
    both equal to $1$ at the top-left corner of the image and increasing along
    the vertical and horizontal directions respectively. For the sample image in
    <FigureLink id="dog-color" />, $i$ and $j$ are positive integers in the
    range $[1, 400]$, meaning $I_{ijn}$ is a $400 \times 400$ matrix when the
    value of $n$ is fixed.
  </p>

  <p>
    Before doing image compression using $I$, let's first work on a simpler
    example: the grayscale version of the image in
    <FigureLink id="dog-color" />. Octave has a built-in function that converts
    color images to grayscale:
  </p>

  <CodeBlock language="matlab" code="J = rgb2gray(I);" />

  <p>
    This makes things easier since $J$ is simply a $400 \times 400$ matrix
    containing the grayscale intensity of each pixel in the original image.
    Entries from $J$ are values in the range $[0, 255]$ with $0$ representing
    black, $255$ representing white, and values in between representing
    different shades of gray. To visualize $J$ in Octave, run:
  </p>

  <CodeBlock language="matlab" code="imshow(J)" />

  <p>
    The displayed image should be identical to the one shown in
    <FigureLink id="dog-grayscale" />.
  </p>

  <FigureBlock
    id="dog-grayscale"
    :caption="`Grayscale version of the image in ${dogFigureLink}.`"
  >
    <ResponsiveImage alt="Dog (grayscale)" :src="dogGrayscale" />
  </FigureBlock>

  <p>
    Now we can proceed to compress $J$. The function defined below will be used
    to compress matrices in the same way as described in
    <RouterLink :to="{ name: '30' }">this post</RouterLink>, with the $N$
    largest singular values from $J$ being preserved while all others are
    discarded:
  </p>

  <CodeBlock
    language="matlab"
    code="
    % A: Input matrix
    % N: Number of singular values to keep
    function [Uc, Sigmac, Vc] = compress_matrix(A, N)
      [U, Sigma, V] = svd(A);
      Uc = U(:, 1:N);
      Sigmac = Sigma(1:N, 1:N);
      Vc = V(:, 1:N);
    end
    "
  />

  <p>
    <b>NOTE</b>: The entries in $J$ are one-byte integers, but the entries in
    $U_c$, $\Sigma_c$ and $V_c$ are
    <a
      href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format"
      >double-precision numbers</a
    >
    (or "doubles", for short) which need eight bytes to be stored. This means
    the total number of entries in these three matrices cannot be directly
    compared with the number of entries in $J$ for storage considerations since
    they don't take up the same amount of space each. For the purposes of this
    post, however, this will not be an issue since our goal is to compress
    images, not matrices.
  </p>

  <p>
    Let's go ahead and compress $J$ by discarding all but its $N = 50$ largest
    singular values:
  </p>

  <CodeBlock
    language="matlab"
    code="
    [Uc, Sigmac, Vc] = compress_matrix(J, 50);
    Jc = uint8(Uc * Sigmac * Vc');
  "
  />

  <p>
    The values of the matrix $J_c = U_c\Sigma_c V_c^T$ must first be converted
    from doubles back to one-byte integers to correctly represent grayscale
    intensities. The smaller the value of $N$, the less information from $J$
    will be preserved, so discarding too many singular values will yield an
    image with very poor quality. To visualize the image represented by $J_c$,
    run:
  </p>

  <CodeBlock language="matlab" code="imshow(Jc)" />

  <p>
    To visualize both the original and generated images next to each other, run:
  </p>

  <CodeBlock
    language="matlab"
    code='
    figure
    subplot(1, 2, 1)
    xlabel("Original")
    imshow(J)
    subplot(1, 2, 2)
    xlabel("Compressed")
    imshow(Jc)
    '
  />

  <p>
    <FigureLink id="dog-grayscale-compression" capitalized /> shows the
    resulting images represented by $J_c$ for several values of $N$ (click
    <a :href="dogGrayscaleCompressionMovie">here</a> to see an animation showing
    all images obtained for values of $N$ ranging from $50$ to $1$):
  </p>

  <FigureBlock
    id="dog-grayscale-compression"
    caption="Images generated by compressing $J$ with different values of $N$.
             Figures (a), (b), (c), (d), (e) and (f) show the resulting images
             for $N = 200$, $100$, $50$, $25$, $10$ and $5$ respectively. Notice
             how the main aspects of the original grayscale image are preserved
             even for small values of $N$."
  >
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=200)"
        :link="dog400x400GrayscaleN200"
        :src="dog200x200GrayscaleN200"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=100)"
        :link="dog400x400GrayscaleN100"
        :src="dog200x200GrayscaleN100"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=50)"
        :link="dog400x400GrayscaleN50"
        :src="dog200x200GrayscaleN50"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=25)"
        :link="dog400x400GrayscaleN25"
        :src="dog200x200GrayscaleN25"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=10)"
        :link="dog400x400GrayscaleN10"
        :src="dog200x200GrayscaleN10"
      />
    </BaseSubfigure>
    <BaseSubfigure id="N5">
      <ResponsiveImage
        alt="Dog (grayscale, N=5)"
        :link="dog400x400GrayscaleN5"
        :src="dog200x200GrayscaleN5"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    A question which is worth asking at this point is: If we store the image
    represented by $J_c$ as a file in PNG format, will it be smaller in size
    than a file similarly generated from $J$? The answer is not a clear "yes"
    since despite being a lossless format, PNG has its own compression mechanism
    which is not the same as the one we used here and might therefore not be
    able to benefit much from our "matrix compression" trick. To see what
    happens, let's store both $J$ and $J_c$ as PNG images and check the
    resulting file sizes:
  </p>

  <CodeBlock
    language="matlab"
    code='
    imwrite(J, "dog-grayscale-original.png")
    imwrite(Jc, "dog-grayscale-compressed.png")
    '
  />

  <p>
    <TableLink id="image-sizes-grayscale" capitalized /> shows the size of the
    resulting PNG images for different values of $N$. On my laptop, the size of
    <code>dog-grayscale-original.png</code> is $103\Kilobyte$.
  </p>

  <TableBlock
    id="image-sizes-grayscale"
    :columns="2"
    caption="Sizes of generated PNG images for different values
             of $N$. Notice that $N = 400$ corresponds to the original image
             since all singular values are kept during the compression process."
  >
    <b>$N$</b>
    <b>Size $(\KilobyteSlim)$</b>

    <span>$400$</span>
    <span>$103$</span>

    <span>$200$</span>
    <span>$102$</span>

    <span>$100$</span>
    <span>$98$</span>

    <span>$50$</span>
    <span>$90$</span>

    <span>$25$</span>
    <span>$78$</span>

    <span>$10$</span>
    <span>$64$</span>

    <span>$5$</span>
    <span>$55$</span>
  </TableBlock>

  <p>
    As <TableLink id="image-sizes-grayscale" /> shows, the PNG images become
    smaller as we discard more and more singular values, but only very slowly as
    $N$ is decreased. Even for $N = 5$ (see
    <FigureLink id="dog-grayscale-compression" subfigure-id="N5" />), the
    resulting image is only $46\%$ smaller than the original despite looking
    very blurred.
  </p>

  <SectionTitle>Compressing the original color image</SectionTitle>

  <p>
    We will now use the technique described above on the original color image.
    Remember that for a fixed $n$, $I_{ijn}$ is a $400 \times 400$ matrix which
    contains the intensity of color $n$ at each pixel in the image, meaning we
    can compress $I_{ij1}$, $I_{ij2}$ and $I_{ij3}$ separately. The following
    code does exactly that for $N = 50$:
  </p>

  <CodeBlock
    language="matlab"
    code="
    N = 50

    [U1c, Sigma1c, V1c] = compress_matrix(I(:, :, 1), N);
    [U2c, Sigma2c, V2c] = compress_matrix(I(:, :, 2), N);
    [U3c, Sigma3c, V3c] = compress_matrix(I(:, :, 3), N);

    % Initialize Ic with the same dimensions as I but filled with zeros.
    Ic = uint8(zeros(size(I, 1), size(I, 2), 3));

    Ic(:, :, 1) = uint8(U1c * Sigma1c * V1c');
    Ic(:, :, 2) = uint8(U2c * Sigma2c * V2c');
    Ic(:, :, 3) = uint8(U3c * Sigma3c * V3c');
  "
  />

  <p>
    <FigureLink id="dog-color-compression" capitalized /> shows the resulting
    images represented by $I_c$ for several values of $N$ (click
    <a :href="dogColorCompressionMovie">here</a> to see an animation showing all
    images obtained for values of $N$ ranging from $50$ to $1$):
  </p>

  <FigureBlock
    id="dog-color-compression"
    caption="Images generated by compressing $I$ with different values of $N$.
             Figures (a), (b), (c), (d), (e) and (f) show the resulting images
             for $N = 200$, $100$, $50$, $25$, $10$ and $5$ respectively."
  >
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=200)"
        :link="dog400x400ColorN200"
        :src="dog200x200ColorN200"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=100)"
        :link="dog400x400ColorN100"
        :src="dog200x200ColorN100"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=50)"
        :link="dog400x400ColorN50"
        :src="dog200x200ColorN50"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=25)"
        :link="dog400x400ColorN25"
        :src="dog200x200ColorN25"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=10)"
        :link="dog400x400ColorN10"
        :src="dog200x200ColorN10"
      />
    </BaseSubfigure>
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (color, N=5)"
        :link="dog400x400ColorN5"
        :src="dog200x200ColorN5"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    Similarly to what we did earlier, we can compare the sizes of PNG images
    represented by $I_c$ for multiple values of $N$ with the size of the
    original PNG image (<FigureLink id="dog-color" />). Since the latter is
    already locally stored as a file, all we need to do is store $I_c$ as a PNG
    image and check its size for a fixed value of $N$:
  </p>

  <CodeBlock
    language="matlab"
    code='
    imwrite(Ic, "dog-color-compressed.png")
    '
  />

  <p>
    <TableLink id="image-sizes-color" capitalized /> shows the size of the
    resulting PNG images for different values of $N$. On my laptop, the size of
    <code>dog-color.png</code> is $309\Kilobyte$.
  </p>

  <TableBlock
    id="image-sizes-color"
    :columns="2"
    caption="Sizes of generated PNG images for different values
             of $N$, with $N = 400$ corresponding to the original image
             since all singular values are kept during the compression process."
  >
    <span>$N$</span>
    <b>Size $(\KilobyteSlim)$</b>

    <span>$400$</span>
    <span>$309$</span>

    <span>$200$</span>
    <span>$307$</span>

    <span>$100$</span>
    <span>$295$</span>

    <span>$50$</span>
    <span>$268$</span>

    <span>$25$</span>
    <span>$235$</span>

    <span>$10$</span>
    <span>$194$</span>

    <span>$5$</span>
    <span>$168$</span>
  </TableBlock>

  <p>
    Similarly to what we observed for the grayscale images, the generated PNG
    images become smaller as we discard more and more singular values from
    $I_{ij1}$, $I_{ij2}$ and $I_{ij3}$, but only very slowly as $N$ is
    decreased. Even for $N = 5$, the resulting image is again only $46\%$
    smaller than the original one.
  </p>

  <p>
    Out of curiosity, I also tried generating images in JPEG format instead of
    PNG. The resulting images were actually larger than the original one except
    for small values of $N$, an interesting result indicating that mixing
    compression algorithms can yield worse results compared to using a single
    one.
  </p>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { onViewMounted } from "@/functions";
import { figureLink } from "@/functions";
import store from "@/store";

import dog200x200ColorN10 from "@/assets/images/dog-200x200-color-N10.png";
import dog200x200ColorN100 from "@/assets/images/dog-200x200-color-N100.png";
import dog200x200ColorN200 from "@/assets/images/dog-200x200-color-N200.png";
import dog200x200ColorN25 from "@/assets/images/dog-200x200-color-N25.png";
import dog200x200ColorN5 from "@/assets/images/dog-200x200-color-N5.png";
import dog200x200ColorN50 from "@/assets/images/dog-200x200-color-N50.png";
import dog200x200GrayscaleN10 from "@/assets/images/dog-200x200-grayscale-N10.png";
import dog200x200GrayscaleN100 from "@/assets/images/dog-200x200-grayscale-N100.png";
import dog200x200GrayscaleN200 from "@/assets/images/dog-200x200-grayscale-N200.png";
import dog200x200GrayscaleN25 from "@/assets/images/dog-200x200-grayscale-N25.png";
import dog200x200GrayscaleN5 from "@/assets/images/dog-200x200-grayscale-N5.png";
import dog200x200GrayscaleN50 from "@/assets/images/dog-200x200-grayscale-N50.png";
import dog400x400ColorN10 from "@/assets/images/dog-400x400-color-N10.png";
import dog400x400ColorN100 from "@/assets/images/dog-400x400-color-N100.png";
import dog400x400ColorN200 from "@/assets/images/dog-400x400-color-N200.png";
import dog400x400ColorN25 from "@/assets/images/dog-400x400-color-N25.png";
import dog400x400ColorN5 from "@/assets/images/dog-400x400-color-N5.png";
import dog400x400ColorN50 from "@/assets/images/dog-400x400-color-N50.png";
import dog400x400GrayscaleN10 from "@/assets/images/dog-400x400-grayscale-N10.png";
import dog400x400GrayscaleN100 from "@/assets/images/dog-400x400-grayscale-N100.png";
import dog400x400GrayscaleN200 from "@/assets/images/dog-400x400-grayscale-N200.png";
import dog400x400GrayscaleN25 from "@/assets/images/dog-400x400-grayscale-N25.png";
import dog400x400GrayscaleN5 from "@/assets/images/dog-400x400-grayscale-N5.png";
import dog400x400GrayscaleN50 from "@/assets/images/dog-400x400-grayscale-N50.png";
import dogColor from "@/assets/images/dog-color.png";
import dogColorCompressionMovie from "@/assets/images/dog-color-compression.gif";
import dogGrayscale from "@/assets/images/dog-grayscale.png";
import dogGrayscaleCompressionMovie from "@/assets/images/dog-grayscale-compression.gif";

onMounted(() => onViewMounted());

const dogFigureLink = computed(() =>
  figureLink("dog-color", store.getters.figureNumber({ id: "dog-color" }))
);
</script>
