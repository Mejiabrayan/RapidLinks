import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import { AccountCard, AccountCardBody, AccountCardFooter } from './AccountCard';
import { Button } from '@/components/ui/button';
import ImageUploader from './ImageUploader';

export default function UpdateProfileCard({ profile }: { profile: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { profile } = Object.fromEntries(form.entries()) as {
      profile: string;
    };

    if (profile.length < 3) {
      toast.error('You must add a profile');
      return;
    }
    startTransition(async () => {
      const res = await fetch('/api/account', {
        method: 'PUT',
        body: JSON.stringify({ profile }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) toast.success('Successfully updated profile!');
      router.refresh();
    });
  };
  return (
    <AccountCard
      params={{
        header: 'Your Profile',
        description: 'Please enter a profile image',
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <ImageUploader />
        </AccountCardBody>
        <AccountCardFooter description='Add a profile image'>
          <Button disabled={isPending}>Update Profile</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
