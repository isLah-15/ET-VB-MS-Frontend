import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../Features/Auth/UserAPI';


type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().max(50).required('First name is required'),
  lastName: yup.string().max(50).required('Last name is required'),
  email: yup.string().email('Invalid email').max(100).required('Email is required'),
  contactPhone: yup.string().max(50).required('Phone number is required'),
  address: yup.string().max(100).required('Address is required'),
  password: yup.string().min(6).max(255).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm your password'),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = userAPI.useCreateUsersMutation({ fixedCacheKey: 'createUser' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await createUser(data).unwrap();
      console.log("response here...", response);
      toast.success('🎉 Registration successful! Check your email for verification.');
      setTimeout(() => {
        navigate('/verify', { state: { email: data.email } });
      }, 2000);
    } catch (error) {
      toast.error('🎪 Oops! Something went wrong. Try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-rose-100 to-red-200 font-circus">
      <div className="w-full max-w-lg bg-white/90 border-4 border-red-500 rounded-xl shadow-2xl px-8 py-10 text-red-900">
        <h1 className="text-4xl text-center font-extrabold mb-8 text-red-700 drop-shadow-xl uppercase tracking-wider">
          🎪 Join The Funfair
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register('firstName')}
              placeholder="First Name"
              className="w-full circus-input"
            />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <input
              {...register('lastName')}
              placeholder="Last Name"
              className="w-full circus-input"
            />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full circus-input"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="tel"
              {...register('contactPhone')}
              placeholder="Phone Number"
              className="w-full circus-input"
            />
            {errors.contactPhone && <p className="text-red-600 text-sm">{errors.contactPhone.message}</p>}
          </div>

          <div>
            <input
              {...register('address')}
              placeholder="Address"
              className="w-full circus-input"
            />
            {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="w-full circus-input"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              className="w-full circus-input"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-lg tracking-wider uppercase transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Step Into The Circus 🎟️'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have a ticket?{' '}
          <a href="/login" className="text-red-700 font-bold hover:underline">
            Enter Here
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
