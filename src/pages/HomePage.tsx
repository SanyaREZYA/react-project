import '../styles/homepage.css';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {setUsername} from '../store/slices/gameSlice';
import {RootState} from '../store';
import {useNavigate} from 'react-router-dom';

type FormData = {
    username: string;
};

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.game.username);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        dispatch(setUsername(data.username));
        navigate('/game');
    };

    return (
        <div className="wellcome-container">
            <h1>Welcome to Minesweeper!</h1>

            <form className="username-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="username-input"
                    placeholder="Enter your username"
                    {...register('username', {required: 'Username is required'})}
                />
                <button className="start-button" type="submit">
                    Start game
                </button>
                {errors.username && <p className="error-message">{errors.username.message}</p>}
            </form>
        </div>
    );
}
