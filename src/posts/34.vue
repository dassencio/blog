<template>
  <p>
    In a <RouterLink :to="{ name: '30' }">previous post</RouterLink>, I
    described how matrices can be compressed through a tool in linear algebra
    called
    <a href="https://en.wikipedia.org/wiki/Singular_value_decomposition">
      singular value decomposition</a
    >
    (SVD). The trick is to discard information (singular values) from the
    original matrix to generate an "approximate" version of it. This post
    describes how that technique can be used to also compress images. The method
    is shown for educational purposes only since it's not adequate for
    professional image compression.
  </p>

  <p>
    I will use <a href="https://www.gnu.org/software/octave/">Octave</a>
    to illustrate the method. If you're using Ubuntu/Debian, you can install it
    by opening a terminal and running the following command (notice that the
    <code>octave-image</code> package must also be installed):
  </p>

  <CodeBlock code="sudo apt-get install octave octave-image" />

  <p>
    Now start Octave. Images can be read in Octave with the
    <code>imread</code> function:
  </p>

  <CodeBlock language="matlab" code='I = imread("dog-color.png");' />

  <FigureBlock id="dog" caption="A sample image with $400 \times 400$ pixels.">
    <ResponsiveImage alt="Dog" :src="dogColor" />
  </FigureBlock>

  <p>
    The command above will read the file
    <code>dog-400x400-color.png</code> (shown in <FigureLink id="dog" />) and
    store it as three-dimensional array $I$. The value $I_{ijn}$ is a one-byte
    integer (i.e., a value in the integer range $[0, 255]$) representing the
    amount of color $n$ on pixel $(i, j)$, where $n = 1, 2, 3$ for the colors
    red, green and blue respectively, and $(i, j)$ represents the position of a
    pixel on the image, with $i$ and $j$ both equal to $1$ at the top-left
    corner of the image, and growing along the vertical and horizontal
    directions respectively. For the sample image <FigureLink id="dog" />, $i$
    and $j$ are positive integers in the range $[1, 400]$, meaning $I_{ijn}$ is
    a $400 \times 400$ matrix when $n$ is fixed.
  </p>

  <p>
    Before doing image compression using $I$, let's first work on a simpler
    example: the grayscale version of the image. Octave has a built-in function
    which converts colored images to grayscale:
  </p>

  <CodeBlock language="matlab" code="J = rgb2gray(I);" />

  <p>
    This makes things easier since $J$ is a $400 \times 400$ matrix which
    contains the grayscale intensity of each pixel of the original image, i.e.,
    entries from $J$ are values in the range $[0, 255]$ with $0$ representing
    black, $255$ representing white and values in between representing different
    shades of gray. To visualize $J$ in Octave, run:
  </p>

  <CodeBlock language="matlab" code="imshow(J)" />

  <p>
    The displayed image will be the same as the one shown in
    <FigureLink id="dog-grayscale" /> below:
  </p>

  <FigureBlock
    id="dog-grayscale"
    caption="Grayscale version of the sample image."
  >
    <ResponsiveImage alt="Dog (grayscale)" :src="dogGrayscale" />
  </FigureBlock>

  <p>
    Now we can proceed to compress $J$. The function defined below will be used
    to compress matrices in the same way as described in this
    <RouterLink :to="{ name: '30' }">previous post</RouterLink>, with only the
    $N$ largest singular values being kept while all others are discarded:
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
    <b>NOTE</b>: Each entry of $J$ is a one-byte integer, but the entries of
    $U_c$, $\Sigma_c$ or $V_c$ are
    <a
      href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format"
      >double-precision numbers</a
    >
    ("doubles", for short) which need eight bytes to be stored. This means the
    total number of entries in these three matrices cannot be directly compared
    with the number of entries of $J$ for storage considerations since the
    latter only requires one byte per entry. For the purposes of this post,
    however, this will not be an issue since our goal is to compress images, not
    matrices.
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
    intensities. The smaller the value of $N$, the less information from the
    original image we preserve, so discarding too many singular values will
    yield a compressed image with very poor quality. To visualize the resulting
    compressed image, run:
  </p>

  <CodeBlock language="matlab" code="imshow(Jc)" />

  <p>
    To visualize both the original and compressed images next to each other,
    run:
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
    resulting images for several values of $N$ (click
    <a :href="dogGrayscaleCompressionMovie">here</a>
    to see an animation showing the resulting images for $N$ values ranging from
    $50$ to $1$):
  </p>

  <FigureBlock
    id="dog-grayscale-compression"
    caption="Grayscale versions of the original image. Figures (a), (b), (c),
             (d), (e) and (f) show compressed versions with $N = 200$, $100$,
             $50$, $25$, $10$ and $5$ respectively. Notice how the main aspects
             of the image are preserved even for small values of $N$.
             Unsurprisingly, the dog becomes less recognizable as $N$ is
             decreased."
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
    <BaseSubfigure>
      <ResponsiveImage
        alt="Dog (grayscale, N=5)"
        :link="dog400x400GrayscaleN5"
        :src="dog200x200GrayscaleN5"
      />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    A question which is worth asking at this point is: If we generated a PNG
    image from $J_c$, will the resulting file be smaller in size than the one
    generated from $J$? The answer is not a clear "yes" since despite being a
    lossless format, PNG does have a compression mechanism which is not the same
    as the one we used here and might therefore not be able to benefit much from
    our "matrix compression" trick. To see what happens, let's store both $J$
    and $J_c$ as PNG files and check the resulting file sizes:
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
    resulting PNG files for different values of $N$. On my laptop, the size of
    <code>dog-grayscale-original.png</code> is $103\Kilobyte$.
  </p>

  <TableBlock
    id="image-sizes-grayscale"
    :columns="2"
    caption="Sizes of the generated grayscale PNG images for different values
             of $N$. Notice that $N = 400$ corresponds to the original image
             since all singular values are kept during the compression process."
  >
    <b>$N$</b>
    <b>Size ($\Kilobyte$)</b>

    <span>$400$</span>
    <span>$103$</span>

    <span>$200$</span>
    <span>$103$</span>

    <span>$100$</span>
    <span>$99$</span>

    <span>$50$</span>
    <span>$90$</span>

    <span>$25$</span>
    <span>$79$</span>

    <span>$10$</span>
    <span>$64$</span>

    <span>$5$</span>
    <span>$55$</span>
  </TableBlock>

  <p>
    As <TableLink id="image-sizes-grayscale" /> shows, the generated PNG images
    do become smaller as we discard more and more singular values, but only very
    slowly as $N$ decreases. To generate a image with only $50\%$ of the size of
    the original grayscale image, we would have to discard all but the largest
    $N = 5$ singular values, which yields an image which is very blurred (see
    <FigureLink id="dog-grayscale-compression" />).
  </p>

  <SectionTitle>Compressing the original color image</SectionTitle>

  <p>
    We can now proceed to compress the original color image. Remember that for a
    fixed $n$, $I_{ijn}$ is a $400 \times 400$ matrix which contains the
    intensity of color $n$ at each pixel of the original image, meaning we can
    compress each of these matrices separately. The following code does exactly
    that for $N = 50$:
  </p>

  <CodeBlock
    language="matlab"
    code="
    N = 50

    [U1c, Sigma1c, V1c] = compress_matrix(I(:, :, 1), N);
    [U2c, Sigma2c, V2c] = compress_matrix(I(:, :, 2), N);
    [U3c, Sigma3c, V3c] = compress_matrix(I(:, :, 3), N);

    % Initialize Ic with the same dimensions as I but filled with zeros.
    Ic = uint8(zeros(size(I,1), size(I,2), 3));

    Ic(:, :, 1) = uint8(U1c * Sigma1c * V1c');
    Ic(:, :, 2) = uint8(U2c * Sigma2c * V2c');
    Ic(:, :, 3) = uint8(U3c * Sigma3c * V3c');
  "
  />

  <p>
    <FigureLink id="dog-color" capitalized /> shows the resulting images for
    several values of $N$ (click
    <a :href="dogColorCompressionMovie">here</a>
    to see an animation showing the resulting images for $N$ values ranging from
    $50$ to $1$):
  </p>

  <FigureBlock
    id="dog-color"
    caption="Colored versions of the original image. Figures (a), (b), (c),
             (d), (e) and (f) show compressed versions with $N = 200$, $100$,
             $50$, $25$, $10$ and $5$ respectively."
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
    Similarly to what we did above, we can compare the sizes a PNG image
    generated from $I_c$ with the original color image. The following command
    generates this PNG image:
  </p>

  <CodeBlock
    language="matlab"
    code='
    imwrite(Ic, "dog-color-compressed.png")
    '
  />

  <p>
    <TableLink id="image-sizes-color" capitalized /> shows the size of the
    resulting JPEG files for different values of $N$. On my laptop, the size of
    <code>dog-color.png</code> is $309\textrm{kB}$.
  </p>

  <TableBlock
    id="image-sizes-color"
    :columns="2"
    caption="Sizes of the generated color JPEG images for different values of
             $N$. As before, $N = 400$ corresponds to the original image
             since all singular values are kept during the compression process."
  >
    <span>$N$</span>
    <b>Size (kB)</b>

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
    Similarly to what we observed for the grayscale image, the generated color
    images become smaller as we discard more and more singular values, but only
    very slowly as $N$ decreases. Even for $N = 5$, the resulting image is still
    only $46\%$ smaller than the original, which should however not come as a
    surprise given that similar results were obtained for the generated
    grayscale images. With that said, I've also that generating images in the
    JPEG format instead of PNG ended up producing larger files than the original
    one except for small values of $N$, a curious result indicating that mixing
    compression algorithms may actually yield worse results than using only one
    of them.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

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
</script>
