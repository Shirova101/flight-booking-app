// src/components/FormField.js
import React from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import formFieldStyles from '../styles/components/FormField.styles.js';
import CustomDatePicker from './CustomDatePicker';

const FormField = ({
  label,
  type,
  value,
  onChange,
  stations = [],
  options = [],
  placeholder = '',
  error = null,
}) => {
  return (
    <View style={formFieldStyles.formFieldContainer}>
      <Text style={formFieldStyles.label}>{label}</Text>
      {type === 'number' && (
        <TextInput
          style={[formFieldStyles.input, error && formFieldStyles.errorBorder]}
          keyboardType="numeric"
          value={String(value)}
          onChangeText={onChange}
        />
      )}
      {type === 'text' && (
        <TextInput
          style={[formFieldStyles.input, error && formFieldStyles.errorBorder]}
          value={String(value)}
          onChangeText={onChange}
          placeholder={placeholder}
        />
      )}
      {type === 'picker' && (
        <Picker
          selectedValue={value}
          style={[formFieldStyles.picker, error && formFieldStyles.errorBorder]}
          onValueChange={onChange}
        >
          
          {options.map((option) => (
            <Picker.Item key={option.id} label={option.label} value={option.value} />
          ))}
        </Picker>
      )}
      {type === 'stations-picker' && (
        <Picker
          selectedValue={value}
          style={[formFieldStyles.picker, error && formFieldStyles.errorBorder]}
          onValueChange={onChange}
        >
          
          {stations.map((station) => (
              <Picker.Item key={station.id} label={`${station.name} (${station.id})`} value={station.name} />
              )
            )
          }
        </Picker>
      )}
      {type === 'date' && (
      
        <CustomDatePicker date={value} onDateChange={onChange} />
      
      )}
      {error && <Text style={formFieldStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormField;
