<script>
    import { enhance } from '$app/forms';

    let { form } = $props();
</script>

<div class="flex flex-row justify-center py-10 px-5">
    <div class="flex flex-col justify-center w-full">
        <form use:enhance method="POST" class="shadow max-w-full w-full md:max-w-[75%] md:w-[75%] lg:max-w-[55%] lg:w-[55%] xl:max-w-[35%] xl:w-[35%] mb-auto mx-auto mt-6 grid grid-cols-2 p-8 gap-4 bg-neutral-100/75 border border-neutral-200/75 rounded-xl">
            <h1 class="col-span-2 text-2xl font-bold">Sign Up</h1>

            <p class="col-span-2 mb-6">To sign up for StudentHub fill in the form below!</p>

            <h2 class="col-span-2 text-lg">Personal Information</h2>

            <div class="col-span-1 flex flex-col">
                <label for="firstName" class="form-label">First Name</label>
                <input name="firstName" id="firstName" type="text" value={form?.username} required placeholder="Steve" class="form-input"/>
                <span class:hidden={!form?.errors?.firstName} class="form-warning">
                    {form?.errors?.firstName}
                </span>
            </div>

            <div class="col-span-1 flex flex-col">
                <label for="lastName" class="form-label">Last Name</label>
                <input name="lastName" id="lastName" type="text" required placeholder="Jobs" class="form-input"/>
                <span class:hidden={!form?.errors?.lastName} class="form-warning">
                    {form?.errors?.lastName}
                </span>
            </div>

            <div class="col-span-2 flex flex-col">
                <label for="username" class="form-label">Username</label>
                <input name="username" id="username" type="text" required placeholder="stevejobs1955" class="form-input"/>
                <span class:hidden={!form?.errors?.username} class="form-warning">
                    {form?.errors?.username}
                </span>
            </div>

            <div class="col-span-2 flex flex-col">
                <label for="email" class="form-label">Personal Email</label>
                <input name="email" id="email" type="email" required placeholder="steve.jobs@example.org" class="form-input"/>
                <span class:hidden={!form?.errors?.email} class="form-warning">
                    {form?.errors?.email}
                </span>
            </div>

            <div class="col-span-2 flex flex-col">
                <label for="password" class="form-label">Password</label>
                <input name="password" id="password" type="password" required placeholder="Password123!" class="form-input"/>
                <span class:hidden={!form?.errors?.password} class="form-warning">
                    {form?.errors?.password}
                </span>
            </div>
        
            <h2 class="col-span-2 text-lg mt-6">Student Information</h2>

            <div class="col-span-2 flex flex-col">
                <label for="studentEmail" class="form-label">Student Email</label>
                <input name="studentEmail" id="studentEmail" type="email" required placeholder="123456@your.uni.example.ac.uk" class="form-input"/>
                <span class:hidden={!form?.errors?.studentEmail} class="form-warning">
                    {form?.errors?.studentEmail}
                </span>
            </div>

            <p class="mt-6 col-span-2">Already have an account? <a href="/auth/signin">Sign in here!</a></p>

            <button class="col-span-2 bg-blue-500 text-white mt-6">Sign up</button>
        </form>
    </div>
</div>