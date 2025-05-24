import './App.css'
import './index.css'
import Question from './Question'
import File from './File'
import Section from './Section'
import { useFormik } from 'formik'
import {basicSchema} from './schemas/index'
import { useRef, useState } from 'react'
import Modal from './Modal'
function App() {

  const onSubmit = () => {
    console.log('submited');
  }

  const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      restaurantNameEn: '',
      restaurantNameAr: '',
      email: '',
      bankAccountIBAN: '',
      password: '',
      confirmPassword: '',
      restaurantType: '',
      commercialRegistrationNumber: '',
      operationRepresentativeEmail: '',
      operationRepresentativePhoneNumber: '',
      operationRepresentativeFullNameEn: '',
      operationRepresentativeFullNameAr: '',
      managementPhoneNumber: '',
      mainBranchNameAr: '',
      mainBranchNameEn: '',
      branchDistrict: '',
      branchAddressName: '',
      branchStreet: '',
      branchBuildingNumber: '',
      branchAddressDescription: '',
      twitterSocialMediaAccount: '',
      instagramSocialMediaAccount: '',
      workingHours: [{day: 'Sunday', from: '', to: ''}],
      googleMapsLocationLink: '',
      contract: '',
      restaurantImage: '',
      commercialLicenseNumber: '',
      taxCertificateNumber: '',
    },
    onSubmit,
    validationSchema: basicSchema,
  });
  
  const [mapOpen, setMapOpen] = useState(false);
  const [map, setMap] = useState('');

  const [workingHoursOpen, setWorkingHoursOpen] = useState(false);

  const [currentWorkingHour, setCurrentWorkingHour] = useState({day: 'Sunday', from: '', to: ''});
  const [workingHours, setWorkingHours] = useState<{day: string; from: string; to: string}[]>([]);
  const [isWorkingHoursEditing, setIsWorkingHoursEditing] = useState(false);
  
  const tempSingleWorkingHour = useRef({day: '', from: '', to: ''});

  const [passwordVisibility1, setPasswordVisibility1] = useState('password');
  const [passwordVisibility2, setPasswordVisibility2] = useState('password');

  
  const handleMapSave = () => {
    if (map === '') {
      setMapOpen(false);
      return;
    }
    setFieldValue('googleMapsLocationLink', map);
    setMapOpen(false);
  };

  const handleWorkingHoursEditing = () => {
    if (currentWorkingHour.day === '' || currentWorkingHour.from === '' || currentWorkingHour.to === '') {
      setWorkingHoursOpen(false);
      setIsWorkingHoursEditing(false);
      return;
    }

    const newWorkingHours = workingHours.map((hour) => {
      if (hour === tempSingleWorkingHour.current) {
        return currentWorkingHour;
      }
      return hour;
    }
    );
    setWorkingHours(newWorkingHours);
    setFieldValue('workingHours', newWorkingHours);

    setIsWorkingHoursEditing(false);
    setWorkingHoursOpen(false);
    setCurrentWorkingHour({day: 'Sunday', from: '', to: ''});
    
  };

  const handlWorkingHoursAdding = () => {
    if (currentWorkingHour.day === '' || currentWorkingHour.from === '' || currentWorkingHour.to === '') {
      setWorkingHoursOpen(false);
      return;
    }

    const newWorkingHours = [...workingHours, currentWorkingHour];
    setWorkingHours(newWorkingHours);
    setCurrentWorkingHour({day: 'Sunday', from: '', to: ''});
    setFieldValue('workingHours', newWorkingHours);

    setWorkingHoursOpen(false);
  };

  
  console.log(errors);

  return (
    <div className='p-2'>
      <div className="flex justify-between p-1 mr-2 ml-2 ">
        <div className='font-urbanist text-2xl text-secondary'>Create a Restaurant Account</div>
        <button className='text-primary font-sans'>العربية</button>
      </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 m-3 mt-0">

            <Section
              gridClassName="grid md:grid-cols-2 lg:border-r pr-3 gap-y-3 gap-x-12"
              titleClassName="col-span-full pl-3 pb-2"
              columnTile="Fill Out Restaurant Registration Form"
              columnDescription="Fill out your personal information to create an account tied to a Restaurant and Continue"
              img="one2.svg"
              >

              <Question
              questionText="Restaurant Name in English*"
              placeholderText="Restaurant Name in English"
              value={values.restaurantNameEn}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="restaurantNameEn"
              isError={errors.restaurantNameEn}
              />

              <Question
              questionText="Restaurant Name in Arabic*"
              placeholderText="Restaurant Name in Arabic"
              value={values.restaurantNameAr}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="restaurantNameAr"
              isError={errors.restaurantNameAr}
              />

              <Question
              questionText="Email*"
              placeholderText="Email"
              inputType="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="email"
              isError={errors.email}
              />

              <Question
              questionText="Bank Account IBAN*"
              placeholderText="Bank Account IBAN*"
              inputType="number"
              value={values.bankAccountIBAN} 
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="bankAccountIBAN"
              isError={errors.bankAccountIBAN}
              />

              <Question
              questionText="Password*"
              placeholderText="Password"
              inputType={passwordVisibility1}
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="password"
              isError={errors.password}
              >
                <img src={passwordVisibility1 === 'password' ? 'eye.svg' : 'eye-off.svg'} className="cursor-pointer size-5 mr-1" onClick={() => setPasswordVisibility1(passwordVisibility1 === 'password' ? 'text' : 'password')} />
                </Question>

              <Question
              questionText="Confirm Password*"
              placeholderText="Confirm Password"
              inputType={passwordVisibility2}
              value={values.confirmPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="confirmPassword"
              isError={errors.confirmPassword}
              >
              <img src={passwordVisibility2 === 'password' ? 'eye.svg' : 'eye-off.svg'} className="cursor-pointer size-5 mr-1" onClick={() => setPasswordVisibility2(passwordVisibility2 === 'password' ? 'text' : 'password')}/>
              </Question>

              <Question
              questionText="Restaurant Type"
              placeholderText="Restaurant Type"
              inputType="text"
              value={values.restaurantType}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="restaurantType"
              isError={errors.restaurantType}
              />

              <Question
              questionText="Commercial Registration Number*"
              placeholderText="Commercial Registration Number"
              inputType="number"
              value={values.commercialRegistrationNumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="commercialRegistrationNumber"
              isError={errors.commercialRegistrationNumber}
              />

              <Question
              questionText="Operation Representative Email*"
              placeholderText="Operation Representative Email"
              inputType="email"
              value={values.operationRepresentativeEmail}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="operationRepresentativeEmail"
              isError={errors.operationRepresentativeEmail}
              />

              <Question
              questionText="Operation Representative Phone Number"
              placeholderText="Operation Representative Phone Number"
              inputType="number"
              value={values.operationRepresentativePhoneNumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="operationRepresentativePhoneNumber"
              isError={errors.operationRepresentativePhoneNumber}
              />

              <Question
              questionText="Operation Representative Full Name in english*"
              placeholderText="Operation Representative Full Name in english"
              value={values.operationRepresentativeFullNameEn}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="operationRepresentativeFullNameEn"
              isError={errors.operationRepresentativeFullNameEn}
              />

              <Question
              questionText="Operation Representative Full Name in arabic*"
              placeholderText="Operation Representative Full Name in arabic"
              value={values.operationRepresentativeFullNameAr}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="operationRepresentativeFullNameAr"
              isError={errors.operationRepresentativeFullNameAr}
              />

              <Question
              questionText="Management phone number*"
              placeholderText="Management phone number"
              inputType="number"
              value={values.managementPhoneNumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="managementPhoneNumber"
              isError={errors.managementPhoneNumber}
              />

              <Question
              questionText="Main Branch NameAr*"
              placeholderText="Main Branch NameAr"
              value={values.mainBranchNameAr}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="mainBranchNameAr"
              isError={errors.mainBranchNameAr}
              />

              <Question
              questionText="Main Branch Name En*" 
              placeholderText="Main Branch Name En"
              value={values.mainBranchNameEn}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="mainBranchNameEn"
              isError={errors.mainBranchNameEn}
              />

              <Question
              questionText="Branch District"
              placeholderText="Branch District"
              value={values.branchDistrict}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="branchDistrict"
              isError={errors.branchDistrict}
              />

              <Question
              questionText="Branch Address Name"
              placeholderText="Branch Address Name"
              value={values.branchAddressName}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="branchAddressName"
              isError={errors.branchAddressName}
              />

              <Question
              questionText="Branch Street"
              placeholderText="Branch Street"
              value={values.branchStreet}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="branchStreet"
              isError={errors.branchStreet}
              />

              <Question
              questionText="Branch Building Number"
              placeholderText="Branch Building Number"
              value={values.branchBuildingNumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="branchBuildingNumber"
              isError={errors.branchBuildingNumber}
              />

              <Question
              questionText="Branch Address Description"
              placeholderText="Branch Address Description"
              value={values.branchAddressDescription}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="branchAddressDescription"
              isError={errors.branchAddressDescription}
              />

              <Question
              questionText="Twitter Social Media Account"
              placeholderText="Twitter Social Media Account"
              value={values.twitterSocialMediaAccount}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="twitterSocialMediaAccount"
              isError={errors.twitterSocialMediaAccount}
              />

              <Question
              questionText="Instagram Social Media Account"
              placeholderText="Instagram Social Media Account"
              value={values.instagramSocialMediaAccount}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id="instagramSocialMediaAccount"
              isError={errors.instagramSocialMediaAccount}
              />

              <div>
                <div className='pb-2 flex justify-between' >
                  <div className='text-base font-urbanist text-secondary'>Google Maps Location Link:</div>
                  <button type='button' className='add-button-style' onClick={()=>setMapOpen(true)}>{values.googleMapsLocationLink ? <img src='edit.svg'/>: <div>+</div>}</button>
                </div>
                {values.googleMapsLocationLink ? <div className='text-base font-urbanist text-secondary border bg-gray-200 shadow-md p-2'>{values.googleMapsLocationLink}</div> : null}
                  {errors.googleMapsLocationLink && <div className='error-text'>{errors.googleMapsLocationLink}</div>}

                <Modal open={mapOpen} onClose={() => setMapOpen(false)} >
                  <div className='text-center'>
                    <div className='w-full text-left'>
                      <h3 className='text-lg font-urbanist font-bold text-primary'>Google Maps Location Link</h3>
                      <p className='text-sm font-urbanist text-secondary'>Please enter the link to your restaurant location on Google Maps.</p>
                      <input onChange={(e)=>{setMap(e.target.value)}} type="text" value={map} className='border border-gray-200 rounded-lg p-2 w-full mt-4' placeholder='Google Maps Location Link' />
                      <div className='flex justify-between items-center mt-4'>
                        <button onClick={() => setMapOpen(false)} type='button' className='border border-primary justify-self-end text-base text-primary font-urbanist font-bold w-full h-12 p-2 rounded-3xl items-center justify-center bg-[#c2d7d7] mr-2'>Close</button>
                        <button onClick={handleMapSave} type='button' className='border border-primary justify-self-end text-base text-white font-urbanist font-bold w-full h-12 p-2 rounded-3xl items-center justify-center bg-primary'>Save</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>

              <div>
                <div className='pb-2 flex justify-between ' >
                  <div className='text-base font-urbanist text-secondary'>Working hours:</div>
                  <button type='button' className='add-button-style' onClick={()=>setWorkingHoursOpen(true)}>+</button>
                </div>
                {values.workingHours.map((hour, index) => (
                  hour.from !== '' && hour.to !== '' ?
                  <div className='flex justify-between items-center border bg-gray-200 shadow-md p-2 mb-3' key={index}>
                      <div key={index} className='text-base font-urbanist text-secondary '>
                        <div>
                        Day: {hour.day}
                          </div>
                          <div>
                        From: {hour.from}
                          </div>
                          <div>
                        To: {hour.to}
                          </div>
                        </div>
                      <div className='flex gap-2'>
                        <img src='edit.svg' className='cursor-pointer' onClick={
                          () => {
                            setWorkingHoursOpen(true);
                            setCurrentWorkingHour(hour);
                            setIsWorkingHoursEditing(true);
                            tempSingleWorkingHour.current = hour;
                          }
                        }/>
                        <img src='delete.svg' className='cursor-pointer' onClick={
                          () => {
                            const newWorkingHours = workingHours.filter((h) => h !== hour);
                            setWorkingHours(newWorkingHours);
                            setFieldValue('workingHours', newWorkingHours);
                          }
                        }/>
                        </div>
                  </div>
                    : null))}
                {errors.workingHours && <div className='error-text'>{typeof errors.workingHours === 'string' ? errors.workingHours : JSON.stringify(errors.workingHours)}</div>}
                  <Modal open={workingHoursOpen} onClose={() => {setWorkingHoursOpen(false); setIsWorkingHoursEditing(false); setCurrentWorkingHour({day: 'Sunday', from: '', to: ''});}} >
                    <div className='text-center'>

                      <div className='w-full text-left'>
                        <h3 className='border-b mb-3 pb-2 text-lg font-bold font-urbanist text-primary'>Working Hours</h3>
                        <p className='text-sm font-urbanist font-semibold text-secondary'>If your shift starts in the morning and ends after midnight, you need to divide it into two shifts: The first shift: Starts at x:xx AM. Ends at 11:59 PM. The second shift: Starts at 12:00 AM (midnight).Ends at x:xx AM.
                        </p>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex justify-between items-center mt-4">
                            <div className='text-base font-urbanist text-secondary'>Day: </div>
                            <select className='border-b border-gray-300 p-2 w-full' value={currentWorkingHour.day} onChange={(e)=>{setCurrentWorkingHour(prev => ({ ...prev, day: e.target.value}) )}} >
                              <option value="Sunday">Sunday</option>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                            </select>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className='text-base font-urbanist text-secondary'>From: </div>
                            <input type="time" className='border-b border-gray-300 p-2 w-full' value={currentWorkingHour.from} onChange={(e)=>{setCurrentWorkingHour(prev => ({ ...prev, from: e.target.value}) )}}/>
                          </div>
                          {/* {errors.workingHours} */}

                          <div className="flex justify-between items-center mt-4">
                            <div className='text-base font-urbanist text-secondary'>To: </div>
                            <input type="time" className='border-b border-gray-300 p-2 w-full' value={currentWorkingHour.to}  onChange={(e)=>{setCurrentWorkingHour(prev => ({ ...prev, to: e.target.value}) )}}/>
                          </div>

                          <div className='flex justify-between items-center mt-4'>
                            <button onClick={() => {setWorkingHoursOpen(false); setIsWorkingHoursEditing(false); setCurrentWorkingHour({day: 'Sunday', from: '', to: ''});}} type='button' className='border border-primary justify-self-end text-base text-primary font-urbanist font-bold w-full h-12 p-2 rounded-3xl items-center justify-center bg-[#c2d7d7] mr-2' >Cansel</button>
                            <button onClick={isWorkingHoursEditing ? handleWorkingHoursEditing: handlWorkingHoursAdding } type='button' className='border border-primary justify-self-end text-base text-white font-urbanist font-bold w-full h-12 p-2 rounded-3xl items-center justify-center bg-primary'>{isWorkingHoursEditing ? <>Save</> : <>Add</> }</button>
                          </div>


                        </div>

                        
                      </div>
                    </div>

                  </Modal>
              </div>
              
            </Section>

              <Section
              gridClassName="grid grid-rows-10 gap-2"
              titleClassName="pl-3 row-span-1"
              columnTile="Attach Required Documents"
              columnDescription="Fill out your personal information to create an account tied to a Restaurant and Continue"
              img="two2.svg"
              >

              <File
              fileText="Please download the contract and read it well, Then sign on it and upload the contract here"
              id="contract"
              isError={errors.contract}
              setFieldValue={setFieldValue}
              >
              <a href="" target="_blank" rel="noopener noreferrer" className='mb-2 size-5 flex '>
                <img src="download.svg" className="cursor-pointer size-5" />
              </a>
                </File>

              <File
              fileText="Restaurant Image"
              id="restaurantImage"
              isError={errors.restaurantImage}
              setFieldValue={setFieldValue}
              />

              <File
              fileText="Commercial License Number"
              id="commercialLicenseNumber"
              isError={errors.commercialLicenseNumber}
              setFieldValue={setFieldValue}
              />

              <File
              fileText="Tax Certificate Number"
              id="taxCertificateNumber"
              isError={errors.taxCertificateNumber}
              setFieldValue={setFieldValue}
              />

              <button type="submit" className='border justify-self-end text-base text-white font-urbanist font-bold w-auto h-12 p-2 rounded-3xl items-center justify-center bg-primary'>Create Account</button>

            </Section>
          </div>
      </form>
    </div>
  )
}

export default App