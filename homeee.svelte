<!-- home page -->

<script lang="ts">
  import { Button } from "bits-ui";
  import { Input } from "$lib/components/ui/input";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
  import { processVideo } from "$lib/api";
  import { Search } from "lucide-svelte";
  
  let youtubeUrl = "";
  let processingMode = "simple";
  let error = "";
  let loading = false;
  
  async function handleSubmit() {
    if (!youtubeUrl) {
      error = "Please enter a YouTube URL";
      return;
    }
    
    loading = true;
    error = "";
    
    try {
      const result = await processVideo(youtubeUrl, processingMode);
      window.location.href = `/result/${result.youtube_id}`;
    } catch (err: any) {
      error = err.message || "An error occurred while processing the video";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Stepify Youtube videos for the sake of your time</title>
</svelte:head>

<div class="container relative">
  <section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
    <h1 class="text-center text-7xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">Stepify Youtube videos <br>for the sake of your time</h1>
    <p class="max-w-[750px] text-center text-lg sm:text-xl text-balance text-muted-foreground">
      No time for Youtube videos? Get a step-by-step tutorial of any video to follow along. Pure transcript. Powered by AI.
    </p>

    <div class="flex flex-col items-start gap-1 pb-11 pt-7">
      <div class="relative w-full">
        <input
          id="apiKey"
          class="inline-flex h-input w-full items-center rounded-card-sm border border-border-input bg-background px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
          placeholder="Paste your URL"
          type="password"
          autocomplete="off"
        />
      </div>
    </div>


     
    <Button.Root
      class="inline-flex h-12 items-center justify-center rounded-input bg-dark
      px-[21px] text-[15px] font-semibold text-background shadow-mini
      hover:bg-dark/95 active:scale-98 active:transition-all"
    >
      Stepified
    </Button.Root>
    
    <div class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
      <a href="/docs" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        Stepified videos
      </a>
      <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
        <svg viewBox="0 0 438.549 438.549" class="mr-2 h-4 w-4">
          <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
        </svg>
        Search database
      </a>
    </div>
  </section>

  <div class="relative">
    <div class="lg:max-w-none">
      {#if error}
        <div class="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-4" role="alert">
          <span class="block sm:inline">{error}</span>
        </div>
      {/if}
<!--       
      <form on:submit|preventDefault={handleSubmit} class="flex items-center space-x-2">
        <div class="relative flex-grow">
          <Input 
            type="url" 
            bind:value={youtubeUrl} 
            placeholder="Enter YouTube URL" 
            required
            class="pr-24" 
          />
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <Select bind:value={processingMode}>
              <SelectTrigger class="h-8 w-20">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={loading} class="h-10 px-4">
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
          {:else}
            <Search class="h-4 w-4" />
          {/if}
        </Button>
      </form> -->
    </div>
  </div>
</div>
