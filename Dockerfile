FROM python

RUN pip install tornado
COPY ./ ./

EXPOSE 80

CMD python main.py
