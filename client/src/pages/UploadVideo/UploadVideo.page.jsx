import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Input from '../../components/Input/Input';
import Textarea from './../../components/Textarea/Textarea';
import Selector from '../../components/Selector/Selector';
import ItemDropzone from './../../components/ItemDropzone/ItemDropzone';
import Button from '../../components/Button/Button';

import styles from './UploadVideo.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Private = [ { value: 0, label: 'Private' }, { value: 1, label: 'Public' } ];

const Category = [
	{ value: 'Film & Animation', label: 'Film & Animation' },
	{ value: 'Autos & Vehicles', label: 'Autos & Vehicles' },
	{ value: 'Music', label: 'Music' },
	{ value: 'Pets & Animals', label: 'Pets & Animals' },
	{ value: 'Sports', label: 'Sports' }
];

const UploadVideoPage = () => {
	const history = useHistory();
	const [ uploadPercent, setUploadPercent ] = useState(0);

	const [ title, setTitle ] = useState();
	const [ description, setDescription ] = useState();
	const [ privacy, setPrivacy ] = useState(0);
	const [ category, setCategory ] = useState();
	const [ filePath, setFilePath ] = useState();
	const [ duration, setDuration ] = useState();
	const [ thumbnail, setThumbnail ] = useState();
	
	const currentUser = useSelector(state => state.user.currentUser);
    
    const baseUrl = 'http://localhost:2020/video';

	// Form submit handler
	const handleOnSubmit = async (event) => {
		event.preventDefault();

		if(!currentUser) {
			alert("Please login first!");
			return history.push("login");
		}

		if(
			!currentUser || 
			title === '' ||
			description === '' ||
			privacy === '' ||
			category === '' ||
			thumbnail === '' ||
			filePath === '' ||
			duration === ''
		) return alert("Please fill all the required fields");

		if(title.length > 50) return alert("Title field should not exceed 50 charactors!")

		const variables = {
			writer: currentUser.id,
			title,
			description,
			privacy,
			category,
			thumbnail,
			filePath,
			duration
		}

		try {
			const response = await axios.post(`${baseUrl}/uploadVideo`, variables);
			
			if(response.data.success) {
				console.log('Video uploaded successfully');
				return history.push("/");
			}

		} catch(error) {
			console.log('[Failed upload video to mongodb]', error.message);
		}
	};

	// Handler on pick mp4 file
	const onDrop = async (files) => {
		const formData = new FormData();
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			},
			onUploadProgress: (progress) => setUploadPercent((progress.loaded * 100) / progress.total)
		};
		console.log(files);
		formData.append('file', files[0]);

		try {
			const response = await axios.post(`${baseUrl}/uploadFiles`, formData, config);
			if (response.data.success) {
				let variables = {
					fileName: response.data.fileName,
					filePath: response.data.filePath
				};

				const newFilePath = response.data.filePath.split('\\').pop() || 
									response.data.fileName;
				setFilePath(newFilePath);

				// Generate thumbnails
				await axios
					.post(`${baseUrl}/thumbnail`, variables)
					.then((response) => {
						if (response.data.success) {
							setDuration(response.data.fileDuration);
							setThumbnail(response.data.thumbnailFilePath);
						}
					})
					.catch((error) => {
						console.log('[Failed to generate thumbnail]', error);
					});
				
				setTimeout(() => {
					setUploadPercent(0);
				},1000);
			}
		} catch (error) {
			console.log('[Failed to save the video]', error);
		}
	};

	return (
		<div className="page form-page">
			<div className={styles.container}>
				<form onSubmit={handleOnSubmit}>
					<div className={styles.uploadContainer}>
						<ItemDropzone onDrop={onDrop} />

						<div className={styles.thumbnail}>
							{thumbnail && (
								<img src={`http://localhost:2020/${thumbnail}`} alt="thumbnail" />
							)}
							{uploadPercent > 0 && 
								<span>
									{uploadPercent && uploadPercent}%
									<b style={{ width:`${uploadPercent}%` }}></b>
								</span>
							}
						</div>
					</div>
						

					<Input
						type="text"
						name="title"
						autoComplete="title"
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<Textarea
						type="text"
						name="description"
						autoComplete="description"
						onChange={(e) => setDescription(e.target.value)}
						required
					/>

					<Selector selectItems={Private} onChange={(e) => setPrivacy(e.target.value)} />

					<Selector selectItems={Category} onChange={(e) => setCategory(e.target.value)} />

					<div className={styles.buttonContainer}>
						<Button title="Create" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default UploadVideoPage;
