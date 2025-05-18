<nav class="bg-neutral-100 border-b border-neutral-200/75 w-auto h-[64px] flex flex-row px-4">
    <div class="mr-auto">
        <a href="/" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub</a>
    </div>

    <div></div>

    <div class="ml-auto flex flex-row gap-3">
        <a href="/auth/signin" class="h-fit my-auto button bg-gray-200 !text-black">Sign in</a>

        <a href="/auth/signup" class="h-fit my-auto button bg-gray-200 !text-black">Sign up</a>
    </div>
</nav>

<div class="h-[calc(100%_-_65px)] overflow-auto">
    <div class="content">
        <main>
            <section>
                <h2>Welcome to StudentHub</h2>
                <p>For Students, By Students.</p> <!-- Slogan can always be changed -->
            </section>
            <section>
                <h2>What is StudentHub?</h2>
                <p>StudentHub is a social media platform specifically designed for students only. 
                    What sets us apart is our dedication to supporting university students in succeeding academically and making the most of their university experience.
                </p>
            </section>
            <section>
                <h2>Student Deals</h2>
                <p>Get the hottest Student Deals, including free/discounted access to services such as Spotify, Github Student Pack, and also food delivery vouchers!</p>
            </section>
            <section>
                <h2>Job Listings</h2>
                <p>Browse regularly updated job listings from verified companies to find one that fits you best.</p>
            </section>
            <section>
                <h2>Accommodation Searching</h2>
                <p>Search for accommodation around your university, using filters to find something perfect for you while you study.</p>
            </section>
        </main>
        <img src="image.png" alt="StudentHub Visual" class="side-image">
    </div> 
</div>

<style>
    main {
        padding: 20px;
        max-width: 800px;
        margin: auto;
    }

    h2 {
        font-weight: bold;
        font-size: 1.5em;
    }

    p {
        font-size: large;
        padding-bottom: 100px;
    }

    .content {   /* Contains the content for everything besides the header and footer. */
        display: flex;
        justify-content: center;
        align-items: flex-start;
        max-width: 1350px;
        margin: auto;
    }

    .side-image { /* This section may need to be adjusted based on the size of the screenshots you take -Kieran */
        width: 600px; /* image width */
        height: 400px; /* image height */
        object-fit: contain;
        padding-top: 40px; /* change this to adjust where the image is veritcally */
        margin-left: 40px;
    }
</style>