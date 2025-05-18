<script>
    import { enhance } from '$app/forms';
    import FormInput from '$lib/components/FormInput.svelte';
    import FormSelect from '$lib/components/FormSelect.svelte';

    let { form, data } = $props();
</script>

<svelte:head>
    <title>Sign Up | StudentHub</title>
</svelte:head>

<div class="bg-gradient flex min-h-full flex-row justify-center">
    <form use:enhance method="POST" class="max-w-full w-full md:max-w-[95%] md:w-[95%] lg:max-w-[75%] lg:w-[75%] xl:max-w-[55%] xl:w-[55%] 2xl:max-w-[45%] 2xl:w-[45%] m-5 md:m-auto p-5 md:p-8 gap-4 gap-y-5 shadow bg-neutral-100 border border-neutral-200 rounded-xl">
        <h1 class="text-2xl font-bold">Sign Up</h1>

        <p class="mb-4">To sign up for StudentHub you must be a student or graduate with a valid student email address.</p>

        <p class="mb-8">If you want to create an account, fill in the form below!</p>

        <div class="grid md:grid-cols-2 gap-8">
            <div class="grid grid-cols-2 h-fit gap-4 gap-y-5">
                <h2 class="col-span-2 text-lg">Personal Information</h2>
            
                <FormInput label="First Name" id="firstName" name="firstName" type="text" required placeholder="Steve" error={form?.errors?.firstName} klass="col-span-1"/>
                
                <FormInput label="Last Name" id="lastName" name="lastName" type="text" required placeholder="Jobs" error={form?.errors?.lastName} klass="col-span-1"/>
                
                <FormInput label="Username" id="username" name="username" type="text" required placeholder="stevejobs1955" error={form?.errors?.username} klass="col-span-2"/>
                
                <FormInput label="Personal Email" id="email" name="email" type="email" required placeholder="steve.jobs@example.org" error={form?.errors?.email} klass="col-span-2"/>
                
                <FormInput label="Password" id="password" name="password" type="password" required placeholder="Password123!" error={form?.errors?.password} klass="col-span-2"/>
    
                <FormInput label="Password Confirmation" id="passwordConfirmation" name="passwordConfirmation" type="password" required description="Re-enter your password again to ensure its entered correctly" placeholder="Password123!" error={form?.errors?.passwordConfirmation} klass="col-span-2"/>
            </div>
            
            <div class="grid grid-cols-2 h-fit gap-4 gap-y-5">
                <h2 class="col-span-2 text-lg">Student Information</h2>
    
                <FormInput label="Student Email" id="studentEmail" name="studentEmail" type="email" required description="Student email should end in '.ac.uk' or '.university'" error={form?.errors?.studentEmail} placeholder="123456@your.uni.example.ac.uk" klass="col-span-2"/>
                
                <FormSelect label="Current University" id="currentUniversityId" name="currentUniversityId" selectPrompt="Select a university" required error={form?.errors?.currentUniversityId} data={data.universities} labelKey="name" valueKey="id" enableFilter klass="col-span-2"/>

                <FormInput label="Current Course" id="currentCourse" name="currentCourse" type="text" required error={form?.errors?.currentCourse} placeholder="BSc Computer Science" klass="col-span-2"/>

                <FormSelect label="Course Level" id="currentCourseLevel" name="currentCourseLevel" selectPrompt="Select a course level" required error={form?.errors?.currentCourseLevel} data={data.courseLevels} klass="col-span-2"/>

                <FormInput label="Course Start" id="currentCourseStart" name="currentCourseStart" type="date" required error={form?.errors?.currentCourseStart} klass="col-span-1"/>

                <FormInput label="Course End" id="currentCourseEnd" name="currentCourseEnd" type="date" required error={form?.errors?.currentCourseEnd} klass="col-span-1"/>
            </div>
        </div>

        <p class="mt-8">Already have an account? <a href="/auth/signin">Sign in here!</a></p>

        <button class="bg-blue-500 text-white mt-8 w-full !px-0">Sign up</button>
    </form>
</div>