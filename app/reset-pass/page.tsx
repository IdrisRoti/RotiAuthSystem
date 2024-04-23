import ResetPasswordForm from '@/components/ResetPasswordForm'

type SearchParamsType = {
  searchParams: {
    token: string | string[] | undefined;
    email: string | string[] | undefined;
  };
};

export default function page({ searchParams }: SearchParamsType) {
const {email, token} = searchParams;

  return (
    <div className="shadow-lg bg-white sm:h-auto sm:w-[60%] lg:w-[40%] w-full h-full py-12 px-4 sm:rounded-lg dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center mb-3">Reset your password</h2>
      <p className="text-center mb-6">Enter your new password</p>
      <ResetPasswordForm email={email} token={token}/>
    </div>
  )
}
