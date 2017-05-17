FROM python

RUN pip install tornado
COPY ./ ./

CMD python main.py
