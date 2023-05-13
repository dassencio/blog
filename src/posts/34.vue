<template>
  <p>
    In a <RouterLink :to="{ name: '30' }">previous post</RouterLink>, I
    described how matrices can be compressed using a tool in linear algebra
    known as
    <a href="https://en.wikipedia.org/wiki/Singular_value_decomposition"
      >singular value decomposition</a
    >
    (SVD). The trick is to discard information (singular values) from the
    original matrix to generate an "approximate" version of it. This post
    investigates whether this technique can also be used to compress images.
    It's important to note that the method shown here is for educational
    purposes only and is not suitable for professional image compression.
  </p>

  <p>
    I will use <a href="https://www.gnu.org/software/octave/">Octave</a> to
    demonstrate the method. If you're using Ubuntu/Debian, you can install it by
    opening a terminal and running the following command (note that the
    <code>octave-image</code> package must also be installed):
  </p>

  <CodeBlock code="sudo apt-get install octave octave-image" />

  <p>
    Now, start Octave. Images can be read in Octave using the
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
    The command above reads the file <code>dog-color.png</code> (shown in
    <FigureLink id="dog-color" />) and stores it as a three-dimensional array
    $I$. The value $I_{ijn}$ is a one-byte integer (i.e., a value in the integer
    range $[0, 255]$) representing the amount of color $n$ on pixel $(i, j)$,
    where $n = 1, 2, 3$ for the colors red, green, and blue, respectively, and
    $(i, j)$ represents the position of a pixel in the image, with $i$ and $j$
    both equal to $1$ at the top-left corner of the image and increasing along
    the vertical and horizontal directions respectively. For the sample image in
    <FigureLink id="dog-color" />, $i$ and $j$ are positive integers in the
    range $[1, 400]$, meaning $I_{ijn}$ is a $400 \times 400$ matrix when the
    value of $n$ is fixed.
  </p>

  <p>
    Before performing image compression using $I$, let's first work on a simpler
    example: the grayscale version of the image in
    <FigureLink id="dog-color" />. Octave has a built-in function that converts
    color images to grayscale:
  </p>

  <CodeBlock language="matlab" code="J = rgb2gray(I);" />

  <p>
    This simplifies matters since $J$ is simply a $400 \times 400$ matrix
    containing the grayscale intensity of each pixel in the original image.
    Entries from $J$ are values in the range $[0, 255]$ with $0$ representing
    black, $255$ representing white, and intermediate values representing
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
    <RouterLink :to="{ name: '30' }">this post</RouterLink>. The $N$ largest
    singular values from $J$ will be preserved while all others are discarded:
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
    $U_c$, $\Sigma_c$, and $V_c$ are
    <a
      href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format"
      >double-precision numbers</a
    >
    (or "doubles", for short), which require eight bytes to be stored. This
    means the total number of entries in these three matrices cannot be directly
    compared with the number of entries in $J$ for storage considerations since
    they don't occupy the same amount of space each. For the purposes of this
    post, however, this will not be an issue since our goal is to compress
    images, not matrices.
  </p>

  <p>
    Let's proceed to compress $J$ by retaining only its $N = 50$ largest
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
    from doubles back to one-byte integers to accurately represent grayscale
    intensities. The smaller the value of $N$, the less information from $J$
    will be preserved. Therefore, discarding too many singular values will yield
    an image of very poor quality. To visualize the image represented by $J_c$,
    run:
  </p>

  <CodeBlock language="matlab" code="imshow(Jc)" />

  <p>
    To visualize both the original and the generated images side by side, run:
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
             Figures (a), (b), (c), (d), (e), and (f) show the resulting images
             for $N = 200$, $100$, $50$, $25$, $10$, and $5$ respectively.
             Observe how the main aspects of the original grayscale image are
             preserved even for small values of $N$."
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
    It is worth asking at this point: If we store the image represented by $J_c$
    as a file in PNG format, will it be smaller in size than a file similarly
    generated from $J$? The answer is not a clear "yes" since, despite being a
    lossless format, PNG has its own compression mechanism which is not the same
    as the one we used here and may therefore not benefit much from our "matrix
    compression" trick. To see what happens, let's store both $J$ and $J_c$ as
    PNG images and check the resulting file sizes:
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
    caption="Size of generated PNG images for different values
             of $N$. Observe that $N = 400$ corresponds to the original image
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
    Looking at the numbers above, we see that the PNG images gradually become
    smaller as we discard more singular values. However, this reduction in size
    unfolds very slowly as $N$ is decreased. Even for $N = 5$ (see
    <FigureLink id="dog-grayscale-compression" subfigure-id="N5" />), the
    resulting image is only $46\%$ smaller than the original, despite appearing
    significantly blurred.
  </p>

  <SectionTitle>Compressing the original color image</SectionTitle>

  <p>
    We will now apply the method described above to the original color image.
    Recall that for a fixed $n$, $I_{ijn}$ is a $400 \times 400$ matrix that
    contains the intensity of color $n$ at each pixel in the image. This implies
    we can compress $I_{ij1}$, $I_{ij2}$, and $I_{ij3}$ separately. The
    following code performs exactly that for $N = 50$:
  </p>

  <CodeBlock
    language="matlab"
    code="
    N = 50;

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
    <FigureLink id="dog-color-compression" capitalized /> displays the resulting
    images represented by $I_c$ for several values of $N$ (click
    <a :href="dogColorCompressionMovie">here</a> to see an animation showing all
    images obtained for values of $N$ ranging from $50$ to $1$):
  </p>

  <FigureBlock
    id="dog-color-compression"
    caption="Images generated by compressing $I$ with different values of $N$.
             Figures (a), (b), (c), (d), (e), and (f) display the resulting
             images for $N = 200$, $100$, $50$, $25$, $10$, and $5$
             respectively."
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
    In the same vein as earlier, we can compare the sizes of PNG images created
    from $I_c$ for various values of $N$ to the size of the original PNG image
    (<FigureLink id="dog-color" />). Since the latter is already stored locally
    as a file, all we need to do is save $I_c$ as a PNG image and check its size
    for a given value of $N$:
  </p>

  <CodeBlock language="matlab" code='imwrite(Ic, "dog-color-compressed.png")' />

  <p>
    <TableLink id="image-sizes-color" capitalized /> shows the size of the
    resulting PNG images for different values of $N$. On my laptop, the size of
    <code>dog-color.png</code> is $309\Kilobyte$.
  </p>

  <TableBlock
    id="image-sizes-color"
    :columns="2"
    caption="Size of generated PNG images for different values
             of $N$, with $N = 400$ representing the original image
             as all singular values are retained during the compression process."
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
    From the numbers above, it's clear that the PNG images shrink in size as we
    discard more singular values from $I_{ij1}$, $I_{ij2}$, and $I_{ij3}$.
    However, the reduction in size again happens quite slowly as we decrease
    $N$. Even for $N = 5$, the resulting image is only $45\%$ smaller than the
    original.
  </p>

  <p>
    Just out of curiosity, I also experimented with generating images in the
    JPEG format instead of PNG. Interestingly, the resulting images were
    actually larger than the original one, except for small values of $N$. This
    unexpected outcome suggests that combining compression algorithms can
    sometimes lead to worse results compared to using a single one.
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
