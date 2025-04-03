import styles from './LoadingSpinner.module.scss';
import tail_spinner from '../../../assets/tail_spin.svg';

const LoadingSpinner = () => {

	return (
		<div className={styles['spinner']}>
			<img src={tail_spinner} alt="loading spinner" />
		</div>
	)
}

export default LoadingSpinner;