'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface KakaoPostcodeData {
  userSelectedType: 'R' | 'J';
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  bname: string;
  buildingName: string;
  apartment: 'Y' | 'N';
}

declare global {
  interface Window {
    kakao: {
      Postcode: new (options: {
        oncomplete: (data: KakaoPostcodeData) => void;
      }) => { open: () => void };
    };
  }
}

function AddressInput() {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const handleSearch = () => {
    new window.kakao.Postcode({
      oncomplete: (data: KakaoPostcodeData) => {
        let addr = '';
        let extra = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동로가]$/.test(data.bname)) {
            extra += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extra +=
              extra !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extra !== '') {
            extra = ` (${extra})`;
          }
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setExtraAddress(extra);
        setDetailAddress('');
      },
    }).open();
  };

  return (
    <>
      <Script
        src='//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
        strategy='lazyOnload'
      />

      <div className='space-y-2'>
        <Label>
          주소<span className='text-destructive'>*</span>
        </Label>

        {/* 우편번호 */}
        <div className='flex gap-1'>
          <Input
            name='postcode'
            value={postcode}
            placeholder='우편번호'
            readOnly
            className='w-40'
            required
          />
          <Button type='button' variant='outline' onClick={handleSearch}>
            주소 검색
          </Button>
        </div>

        {/* 주소 */}
        <Input
          name='address'
          value={address}
          placeholder='주소'
          readOnly
          required
        />

        <div className='grid gap-2 md:grid-cols-2'>
          {/* 상세주소 */}
          <Input
            name='detailAddress'
            value={detailAddress}
            onChange={e => setDetailAddress(e.target.value)}
            placeholder='상세주소'
            required
          />

          {/* 참고항목 */}
          <Input
            name='extraAddress'
            value={extraAddress}
            placeholder='참고항목'
            readOnly
            required
          />
        </div>
      </div>
    </>
  );
}

export default AddressInput;
