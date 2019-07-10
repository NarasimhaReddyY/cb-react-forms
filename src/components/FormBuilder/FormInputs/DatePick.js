import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import DatePicker from 'react-date-picker';

class DatePick extends Component {
  render() {
		const  {
			meta,
			item,
			input,
			label,
			required,
			readOnly,
			formInput,
			generator,
			showError,
			defaultValue,
		} = this.props;

		const props = generator ? {
			value: defaultValue || input.value,
			onChange: val => input.onChange(val),
			disabled: readOnly,
		} : {
			value: new Date()
		}

    return (
      <div>
				<React.Fragment>
					<HeaderLabel 
						label={generator ? label : item.label } 
						required={generator ? required : item.required}
						readOnly={readOnly} 
					/>
					{
						generator ?
						formInput.maxDate &&
						formInput.minDate
							? <DatePicker 
									{...props}
									maxDate={new Date(formInput.maxDate)}
									minDate={new Date(formInput.minDate)}
								/>
							: formInput.minDate 
								? <DatePicker 
										{...props}
										minDate={new Date(formInput.minDate)}
									/>
								: formInput.maxDate
									? <DatePicker 
											{...props}
											maxDate={new Date(formInput.maxDate)}
										/>
									: <DatePicker 
											{...props}
										/>
						: <DatePicker 
								{...props}
							/>
					}
					<div>
						{generator ? showError(meta.touched, meta.error, meta.warning) : ''}
					</div>
				</React.Fragment>
			</div>
		)
	}
}

DatePick.defaultProps = {
	generator: false
}

export default DatePick;