process.env.NODE_ENV = 'test'

const { expect } = require('chai');
const supertest = require('supertest');

const { NODE_ENV, TEST_DB_URL } = require('../src/config');


global.expect = expect;
global.supertest = supertest;
global.NODE_ENV = NODE_ENV;
global.TEST_DB_URL = TEST_DB_URL;
