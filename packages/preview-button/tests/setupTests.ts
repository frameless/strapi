/* eslint-disable no-undef */
import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
