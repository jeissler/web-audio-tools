<template>
  <PageLayout title="About">
    <div class="space-y-6 text-gray-700">
      <p class="leading-relaxed">
        Hey there! I'm a
        <a
          href="https://www.linkedin.com/in/jeissler"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          Software Engineer
        </a>
        who's always been fascinated by audio technology and the Web Audio API. This project started
        as a way to dive deeper into browser-based audio processing and experiment with some cool
        audio manipulation techniques. I've always been drawn to projects that combine technical
        complexity with creative potential, and audio processing definitely fits that bill. There's
        something incredibly satisfying about building tools that can transform, analyze, and
        manipulate sound in real-time.
      </p>

      <p class="leading-relaxed">
        This is very much a labor of love - I built these tools because I wanted to learn more about
        audio APIs and create something that might be useful for other developers, musicians and
        audio enthusiasts. If you find these tools useful for your own projects, learning, or just
        messing around with audio, I'd love to hear about it! Feel free to reach out with feedback,
        suggestions, or just to share what you're building.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mt-8">
        <h3 class="font-semibold text-blue-900 mb-2">Community & Open Source</h3>
        <p class="text-blue-800 leading-relaxed">
          A huge thanks to the open source community and all the developers who've shared their
          knowledge about audio processing, Web APIs, and web development. This project wouldn't
          exist without the countless tutorials, documentation, and code examples that the community
          has generously provided. Special shoutout to the Web Audio API working group and all the
          browser developers pushing this technology forward.
        </p>
      </div>

      <p class="text-sm text-gray-500 italic">
        Built with Vue 3, TypeScript, and a whole lot of caffeine. The source code is available on
        <a
          href="https://github.com/jeissler"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          GitHub
        </a>
        if you're curious about the implementation details.
      </p>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue'
</script>
